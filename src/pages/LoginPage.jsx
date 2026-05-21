import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHandlersLogin } from "../handlers/loginHandler";
import { ROUTES } from "../routes/constants";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { handleLogin } = useHandlersLogin();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await handleLogin(formData);
    } catch (error) {
      setError(error.message || "Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
    window.location.href = `${apiBase}/auth/google/`;
  };

  return (
    <div className="container jersey-25-regular my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-1 shadow-sm">
            <div className="card-body p-4">
              <h2 className="azul text-center mb-4">Entrar</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${error ? "is-invalid" : ""}`}
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
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>

                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="px-3 text-muted small">ou</span>
                  <hr className="flex-grow-1" />
                </div>

                <button
                  type="button"
                  className="btn btn-outline-dark w-100"
                  onClick={handleGoogleLogin}
                >
                  <i className="bi bi-google me-2"></i>
                  Entrar com Google
                </button>

                <div
                  className="alert alert-secondary mt-3 mb-0 p-2 text-center"
                  style={{ fontSize: '0.85rem', backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}
                >
                  <i className="bi bi-info-circle me-1 text-primary"></i>
                  <strong style={{ letterSpacing: "0.5px" }}>Atenção Recrutador:</strong> O acesso via Google cria automaticamente um perfil de <strong style={{ letterSpacing: "0.5px" }}>Estudante</strong>. Para cadastrar sua empresa e publicar vagas, utilize o <Link to={ROUTES.REGISTER} className="fw-bold azul text-decoration-none" style={{ letterSpacing: "0.5px" }}>formulário normal</Link> e selecione "Recrutador".
                </div>
              </form>

              <div className="text-center mt-3">
                <p>
                  Não tem uma conta?{" "}
                  <Link
                    to={ROUTES.REGISTER}
                    className="azul text-decoration-none"
                  >
                    Cadastre-se
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
