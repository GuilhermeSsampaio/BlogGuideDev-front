import React, { useEffect, useMemo, useRef, useState } from "react";
import apiService from "../../services/api/bridge";
import authService from "../../services/auth";
import {
  normalizePushSubscription,
  urlBase64ToUint8Array,
} from "../../utils/pushSubscription";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_REGEX = /^[a-z0-9._-]+$/;

export default function UserConfigTab({
  formData,
  handleInputChange,
  handleSaveProfile,
  showWarning,
  logout,
  originalUsername,
  hasUnsavedChanges,
  handleDiscardChanges,
}) {

  const BIO_CHAR_LIMIT = 300;

  const renderMarkdown = (input) => {
    if (!input) return "";
    // Parser simples para markdown basico: negrito, italico e links.
    const escaped = input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const withLinks = escaped.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    const withBold = withLinks.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    const withItalic = withBold.replace(/\*([^*]+)\*/g, "<em>$1</em>");

    return withItalic.replace(/\n/g, "<br />");
  };

  const [saveStatus, setSaveStatus] = useState("idle");
  const [pushEnabled, setPushEnabled] = useState(
    localStorage.getItem("pwa_push_opt_in") === "true"
  );
  const [pushLoading, setPushLoading] = useState(false);
  const previewHtml = useMemo(
    () => renderMarkdown(formData.biografia),
    [formData.biografia]
  );

  // ── Estado de validação do username ──
  const [usernameStatus, setUsernameStatus] = useState({
    checking: false,
    available: null,
    message: "",
  });
  const usernameTimerRef = useRef(null);

  // ── Debounced username check ──
  useEffect(() => {
    const username = (formData.username || "").trim().toLowerCase();
    const currentUsername = (originalUsername || "").trim().toLowerCase();

    // Limpa timer anterior
    if (usernameTimerRef.current) {
      clearTimeout(usernameTimerRef.current);
      usernameTimerRef.current = null;
    }

    // Se vazio, reseta estado
    if (!username) {
      setUsernameStatus({ checking: false, available: null, message: "" });
      return;
    }

    // Se é o mesmo username atual do usuário, não precisa verificar e não exibe validação visual
    if (username === currentUsername) {
      setUsernameStatus({ checking: false, available: null, message: "" });
      return;
    }

    // Validação local (tamanho mínimo)
    if (username.length < USERNAME_MIN_LENGTH) {
      setUsernameStatus({
        checking: false,
        available: false,
        message: `Mínimo ${USERNAME_MIN_LENGTH} caracteres`,
      });
      return;
    }

    // Validação local (tamanho máximo)
    if (username.length > USERNAME_MAX_LENGTH) {
      setUsernameStatus({
        checking: false,
        available: false,
        message: `Máximo ${USERNAME_MAX_LENGTH} caracteres`,
      });
      return;
    }

    // Validação local (caracteres permitidos)
    if (!USERNAME_REGEX.test(username)) {
      setUsernameStatus({
        checking: false,
        available: false,
        message: "Apenas letras, números, '.', '_' ou '-'",
      });
      return;
    }

    // Passou validação local → agendar verificação na API
    setUsernameStatus({ checking: true, available: null, message: "Verificando..." });

    usernameTimerRef.current = setTimeout(async () => {
      const result = await authService.checkUsername(username);
      setUsernameStatus({
        checking: false,
        available: result.available,
        message: result.message,
      });
    }, 500);

    // Cleanup ao desmontar ou ao mudar username
    return () => {
      if (usernameTimerRef.current) {
        clearTimeout(usernameTimerRef.current);
        usernameTimerRef.current = null;
      }
    };
  }, [formData.username, originalUsername]);

  // Wrapper para forçar lowercase no input de username
  const handleUsernameChange = (e) => {
    const sanitized = e.target.value.toLowerCase().replace(/\s/g, "");
    handleInputChange({
      target: { name: "username", value: sanitized, type: "text" },
    });
  };

  // Classe CSS para o input de username
  const getUsernameInputClass = () => {
    const username = (formData.username || "").trim();
    if (!username) return "form-control";
    if (usernameStatus.checking) return "form-control";
    if (usernameStatus.available === true) return "form-control is-valid";
    if (usernameStatus.available === false) return "form-control is-invalid";
    return "form-control";
  };

  // Username é válido para salvar
  const isUsernameValid =
    !usernameStatus.checking &&
    (usernameStatus.available === true ||
      (formData.username || "").trim().toLowerCase() === (originalUsername || "").trim().toLowerCase());

  const isSaveDisabled =
    saveStatus === "saving" ||
    usernameStatus.checking ||
    (formData.username && !isUsernameValid);

  const supportsPush = () =>
    typeof window !== "undefined" &&
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window;

  const isSameKey = (existingKey, expectedKey) => {
    if (!existingKey || !expectedKey) return false;
    const existingBytes = new Uint8Array(existingKey);
    if (existingBytes.length !== expectedKey.length) return false;
    for (let i = 0; i < existingBytes.length; i += 1) {
      if (existingBytes[i] !== expectedKey[i]) return false;
    }
    return true;
  };

  useEffect(() => {
    let active = true;

    const syncPushState = async () => {
      if (!supportsPush()) return;
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (!active) return;
        const enabled = Boolean(subscription);
        localStorage.setItem("pwa_push_opt_in", enabled ? "true" : "false");
        setPushEnabled(enabled);
      } catch (error) {
        console.warn("Falha ao sincronizar push:", error);
      }
    };

    syncPushState();
    return () => {
      active = false;
    };
  }, []);

  const handleTogglePush = async () => {
    if (!supportsPush()) {
      showWarning("Seu navegador não suporta notificações push.");
      return;
    }

    setPushLoading(true);

    try {
      const registration = await navigator.serviceWorker.ready;
      const existing = await registration.pushManager.getSubscription();

      if (!pushEnabled) {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          showWarning("Permissão de notificação não concedida.");
          return;
        }

        const { public_key } = await apiService.getPushPublicKey();
        const applicationServerKey = urlBase64ToUint8Array(public_key);
        let subscription = existing;

        if (subscription && !isSameKey(subscription.options.applicationServerKey, applicationServerKey)) {
          await subscription.unsubscribe();
          subscription = null;
        }

        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey,
          });
        }

        await apiService.subscribePush(normalizePushSubscription(subscription));
        localStorage.setItem("pwa_push_opt_in", "true");
        setPushEnabled(true);
        return;
      }

      if (existing) {
        const endpoint = existing.endpoint;
        await existing.unsubscribe();
        await apiService.unsubscribePush(endpoint);
      }

      localStorage.setItem("pwa_push_opt_in", "false");
      setPushEnabled(false);
    } catch (error) {
      console.error("Erro ao atualizar push:", error);
      showWarning("Nao foi possivel atualizar notificacoes push.");
    } finally {
      setPushLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username && !isUsernameValid) {
      showWarning("Verifique o username antes de salvar.");
      return;
    }

    setSaveStatus("saving");

    try {
      await handleSaveProfile(e);

      setSaveStatus("success");

      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);

    } catch (error) {
      console.error(error);
      setSaveStatus("idle");
    }
  };

  return (
    <div>
      <h5 className="azul mt-2 mb-3 fw-bold">Configurações da Conta</h5>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-bold">Username</label>
              <input
                type="text"
                className={getUsernameInputClass()}
                name="username"
                value={formData.username}
                onChange={handleUsernameChange}
                maxLength={USERNAME_MAX_LENGTH}
                required
              />
              <div className="form-text">
                {usernameStatus.checking && (
                  <span className="text-info">
                    <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                    Verificando...
                  </span>
                )}
                {!usernameStatus.checking && usernameStatus.available === true && (
                  <span className="text-success">
                    <i className="bi bi-check-circle me-1"></i>
                    {usernameStatus.message}
                  </span>
                )}
                {!usernameStatus.checking && usernameStatus.available === false && (
                  <span className="text-danger">
                    <i className="bi bi-x-circle me-1"></i>
                    {usernameStatus.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-bold">Nome completo</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Biografia</label>
          <div className="row g-3">
            <div className="col-12 col-lg-6">
              <textarea
                className="form-control"
                rows="6"
                name="biografia"
                value={formData.biografia}
                onChange={handleInputChange}
                placeholder="Conte um pouco sobre você..."
                maxLength={BIO_CHAR_LIMIT}
              />
              <div className="d-flex justify-content-between mt-2 text-muted small">
                <span>Markdown basico: **negrito**, *italico*, [link](https://...)</span>
                <span>
                  {formData.biografia.length}/{BIO_CHAR_LIMIT}
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="bio-preview">
                {formData.biografia ? (
                  <div
                    className="bio-preview-content"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                ) : (
                  <p className="text-muted mb-0">A pre-visualizacao aparece aqui.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-bold">
                <i className="bi bi-github me-1"></i>
                GitHub
              </label>
              <input
                type="url"
                className="form-control"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="https://github.com/seuusuario"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-bold">
                <i className="bi bi-linkedin me-1"></i>
                LinkedIn
              </label>
              <input
                type="url"
                className="form-control"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/seuusuario"
              />
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <h6 className="azul mb-3">Preferências</h6>

        <div className="row">
          <div className="col-md-6">
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="notificacaoPush"
                checked={pushEnabled}
                onChange={handleTogglePush}
                disabled={pushLoading}
              />
              <label className="form-check-label" htmlFor="notificacaoPush">
                Habilitar notificações push (PWA)
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="perfilPublico"
                name="is_public"
                checked={formData.is_public}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="perfilPublico">
                Perfil público
              </label>
            </div>
          </div>
        </div>

        {/* BOTÕES */}

        <div className="user-config-actions mt-4">

          <div className="w-100">
            {hasUnsavedChanges && (
              <div className="alert alert-warning mb-3 d-flex align-items-center justify-content-between">
                <div>
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong>Atenção:</strong> Você possui modificações que ainda não foram salvas.
                </div>
                <div>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-dark me-2" 
                    onClick={handleDiscardChanges}
                  >
                    Descartar Alterações
                  </button>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() =>
                  showWarning("Funcionalidade de exclusão em desenvolvimento")
                }
              >
                <i className="bi bi-trash me-1"></i>
                Excluir Conta
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaveDisabled || !hasUnsavedChanges}
              >
                {saveStatus === "saving" && (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Salvando...
                  </>
                )}

                {saveStatus === "success" && (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Salvo com sucesso
                  </>
                )}

                {saveStatus === "idle" && (
                  <>
                    <i className="bi bi-check me-1"></i>
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        <hr className="my-4" />

        <div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Sair da conta
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}