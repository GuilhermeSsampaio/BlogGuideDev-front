import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useHandlersRegister } from "../handlers/registerHandler";
import { ROUTES } from "../routes/constants";
import { cnpj } from "cpf-cnpj-validator";
import authService from "../services/auth";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_REGEX = /^[a-z0-9._-]+$/;

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    tipoPerfil: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cnpjData, setCnpjData] = useState({
    value: "",
    loading: false,
    error: "",
    companyName: "",
    isValid: false,
  });
  const [submitted, setSubmitted] = useState(false);

  // ── Estado de validação do username ──
  const [usernameStatus, setUsernameStatus] = useState({
    checking: false,
    available: null, // null = não verificado, true = disponível, false = indisponível
    message: "",
  });
  const usernameTimerRef = useRef(null);

  const { handleRegister } = useHandlersRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      // Força lowercase e remove espaços ao digitar
      const sanitized = value.toLowerCase().replace(/\s/g, "");
      setFormData((prev) => ({ ...prev, username: sanitized }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Debounced username check ──
  useEffect(() => {
    const username = formData.username.trim();

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
  }, [formData.username]);

  const handleCnpjChange = async (e) => {
    const rawValue = e.target.value.replace(/\D/g, "").slice(0, 14);
    const maskedValue = cnpj.format(rawValue);

    setCnpjData((prev) => ({
      ...prev,
      value: maskedValue,
      error: "",
      companyName: "",
      isValid: false,
    }));

    if (rawValue.length === 14) {
      if (cnpj.isValid(rawValue)) {
        await fetchCnpjData(rawValue);
      } else {
        setCnpjData((prev) => ({
          ...prev,
          error: "CNPJ matematicamente inválido.",
          isValid: false,
        }));
      }
    }
  };

  const fetchCnpjData = async (value) => {
    setCnpjData((prev) => ({ ...prev, loading: true }));
    try {
      const resp = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${value}`);
      if (!resp.ok) throw new Error("CNPJ não encontrado.");
      const data = await resp.json();

      const isAtiva = data.descricao_situacao_cadastral === "ATIVA";

      setCnpjData({
        value: cnpj.format(value),
        loading: false,
        error: isAtiva
          ? ""
          : `Empresa não permitida: Situação ${data.descricao_situacao_cadastral}`,
        companyName: data.razao_social,
        isValid: isAtiva,
      });
    } catch (err) {
      setCnpjData((prev) => ({
        ...prev,
        loading: false,
        error: "Erro ao consultar API do CNPJ.",
        isValid: false,
      }));
    }
  };

  // Username é válido quando: disponível = true e não está verificando
  const isUsernameValid =
    usernameStatus.available === true && !usernameStatus.checking;

  // Classe CSS para o input de username
  const getUsernameInputClass = () => {
    const username = formData.username.trim();
    if (!username && !submitted) return "form-control";
    if (!username && submitted) return "form-control is-invalid";
    if (usernameStatus.checking) return "form-control";
    if (usernameStatus.available === true) return "form-control is-valid";
    if (usernameStatus.available === false) return "form-control is-invalid";
    return "form-control";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!isUsernameValid) {
      setError("Verifique o username antes de continuar.");
      return;
    }

    if (formData.tipoPerfil === "recrutador" && !cnpjData.value) {
      setError("Por favor, preencha o CNPJ.");
      return;
    }

    if (formData.tipoPerfil === "recrutador" && !cnpjData.isValid) {
      setError("CNPJ inválido ou empresa não ativa.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = { ...formData };
      if (formData.tipoPerfil === "recrutador") {
        payload.cnpj = cnpjData.value.replace(/\D/g, "");
      }
      await handleRegister(payload);
    } catch (error) {
      setError("Erro inesperado. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container jersey-25-regular my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-1 shadow-sm">
            <div className="card-body p-4">
              <h2 className="azul text-center mb-4">Criar Conta</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Nome completo</label>
                  <input
                    type="text"
                    className={`form-control ${submitted && !formData.name ? 'is-invalid' : ''}`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className={getUsernameInputClass()}
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="ex: meu.usuario_01"
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
                    {!formData.username && !submitted && (
                      <span className="text-muted">
                        Apenas letras, números, '.', '_' ou '-'. Mínimo {USERNAME_MIN_LENGTH} caracteres.
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${submitted && !formData.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Senha</label>
                  <input
                    type="password"
                    className={`form-control ${submitted && !formData.password ? 'is-invalid' : ''}`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirmar senha</label>
                  <input
                    type="password"
                    className={`form-control ${submitted && !formData.confirmPassword ? 'is-invalid' : ''}`}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Bio (opcional)</label>
                  <textarea
                    className="form-control"
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipo de perfil</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="tipoPerfil"
                        id="tipoEstudante"
                        value="user"
                        checked={formData.tipoPerfil === "user"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="tipoEstudante">
                        Estudante
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="tipoPerfil"
                        id="tipoRecrutador"
                        value="recrutador"
                        checked={formData.tipoPerfil === "recrutador"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="tipoRecrutador">
                        Recrutador
                      </label>
                    </div>
                  </div>
                </div>

                {formData.tipoPerfil === "recrutador" && (
                  <div className="mb-3">
                    <label className="form-label">CNPJ da Empresa</label>
                    <input
                      type="text"
                      className={`form-control ${
                        (submitted && !cnpjData.value) || cnpjData.error ? "is-invalid" : cnpjData.isValid ? "is-valid" : ""
                      }`}
                      name="cnpj"
                      value={cnpjData.value}
                      onChange={handleCnpjChange}
                      placeholder="00.000.000/0000-00"
                      required
                    />
                    <div className="form-text">
                      {cnpjData.loading && <span className="text-info">Consultando dados...</span>}
                      {cnpjData.error && <span className="text-danger">{cnpjData.error}</span>}
                      {cnpjData.isValid && (
                        <span className="text-success d-block">
                          <strong>Razão Social:</strong> {cnpjData.companyName}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading || usernameStatus.checking}
                >
                  {loading ? "Criando conta..." : "Criar conta"}
                </button>
              </form>

              <div className="text-center mt-3">
                <p>
                  Já tem uma conta?{" "}
                  <Link to={ROUTES.LOGIN} className="azul text-decoration-none">
                    Entrar
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

