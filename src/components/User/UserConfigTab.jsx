import React, { useMemo, useState } from "react";

export default function UserConfigTab({
  formData,
  handleInputChange,
  handleSaveProfile,
  showWarning,
  logout,
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
  const previewHtml = useMemo(
    () => renderMarkdown(formData.biografia),
    [formData.biografia]
  );

  const handleTogglePush = async () => {
    if (!("Notification" in window)) {
      showWarning("Seu navegador não suporta notificações push.");
      return;
    }

    if (!pushEnabled) {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        showWarning("Permissão de notificação não concedida.");
        return;
      }
      localStorage.setItem("pwa_push_opt_in", "true");
      setPushEnabled(true);
      return;
    }

    localStorage.setItem("pwa_push_opt_in", "false");
    setPushEnabled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
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
                className="form-control text-muted"
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
                className="form-control text-muted"
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
            disabled={saveStatus === "saving"}
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

        <hr className="my-4" />

        <div>
          <h6 className="text-danger mb-3 fw-bold">Sessão</h6>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Sair da conta
          </button>
        </div>

      </form>
    </div>
  );
}