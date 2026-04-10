import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHandlersRegister } from "../handlers/registerHandler";
import { ROUTES } from "../routes/constants";
import { cnpj } from "cpf-cnpj-validator";

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

  const { handleRegister } = useHandlersRegister();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nome completo</label>
                  <input
                    type="text"
                    className="form-control"
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
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                        cnpjData.error ? "is-invalid" : cnpjData.isValid ? "is-valid" : ""
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
                  disabled={loading}
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
