import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiService from "../services/api/bridge";
import { showToast } from "../utils/toastConfig";
import { ROUTES } from "../routes/constants";
import { useAuth } from "../hooks/useAuth";

export default function FeedbackPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tipo: "sugestao",
    titulo: "",
    descricao: "",
    email_contato: "",
    canal_contato: "email",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpa o erro do campo ao digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.tipo) {
      newErrors.tipo = "Selecione o tipo do feedback.";
    }

    if (!formData.titulo.trim()) {
      newErrors.titulo = "O título é obrigatório.";
    } else if (formData.titulo.trim().length < 3) {
      newErrors.titulo = "O título deve ter pelo menos 3 caracteres.";
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = "A descrição é obrigatória.";
    } else if (formData.descricao.trim().length < 10) {
      newErrors.descricao = "A descrição deve ter pelo menos 10 caracteres.";
    }

    // Email é opcional, mas se preenchido deve ser válido
    if (formData.email_contato.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email_contato.trim())) {
        newErrors.email_contato = "Informe um email válido.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      showToast.error("Você precisa estar logado para enviar feedback.");
      return;
    }

    if (!validate()) {
      showToast.error("Corrija os campos destacados antes de enviar.");
      return;
    }

    setLoading(true);

    try {
      await apiService.createSugestao(formData);
      showToast.success("Feedback enviado! Obrigado por contribuir.");
      setFormData({
        tipo: "sugestao",
        titulo: "",
        descricao: "",
        email_contato: "",
        canal_contato: "email",
      });
      setErrors({});
      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 1500);
    } catch (error) {
      console.error(error);
      showToast.error("Não foi possível enviar seu feedback agora.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-4 jersey-25-regular">
            <h1 className="azul mb-0">Sugestões e Bugs</h1>
            <p className="lead text-muted">
              Encontrou um problema ou quer sugerir algo novo? Envie aqui.
            </p>
          </div>

          {/* Banner de login obrigatório */}
          {!isAuthenticated && (
            <div className="feedback-login-banner mb-4">
              <div className="feedback-login-banner-icon">
                <i className="bi bi-lock-fill"></i>
              </div>
              <div className="feedback-login-banner-content">
                <h5 className="mb-1">Acesso restrito a usuários cadastrados</h5>
                <p className="mb-2">
                  Para enviar sugestões ou reportar bugs, é necessário estar logado. Assim conseguimos identificar quem enviou e dar um retorno adequado.
                </p>
                <div className="d-flex gap-2 flex-wrap">
                  <Link to={ROUTES.LOGIN} className="btn btn-primary btn-sm px-3">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Fazer login
                  </Link>
                  <Link to={ROUTES.REGISTER} className="btn btn-outline-primary btn-sm px-3">
                    <i className="bi bi-person-plus me-1"></i> Criar conta
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className={`card border-1 shadow-sm ${!isAuthenticated ? "feedback-form-disabled" : ""}`}>
            <div className="card-body p-4 p-md-4">
              <form onSubmit={handleSubmit} noValidate>
                <fieldset disabled={!isAuthenticated}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold">Tipo <span className="text-danger">*</span></label>
                      <select
                        className={`form-select ${errors.tipo ? "is-invalid" : ""}`}
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                      >
                        <option value="sugestao">Sugestão</option>
                        <option value="bug">Bug</option>
                      </select>
                      {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold">Título <span className="text-danger">*</span></label>
                      <input
                        className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Resumo rápido da sugestão ou do problema"
                        maxLength={120}
                      />
                      {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold">Descrição <span className="text-danger">*</span></label>
                      <textarea
                        className={`form-control ${errors.descricao ? "is-invalid" : ""}`}
                        rows="6"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descreva com detalhes para conseguirmos reproduzir/entender"
                        maxLength={2000}
                      ></textarea>
                      {errors.descricao && <div className="invalid-feedback">{errors.descricao}</div>}
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold">Email para retorno <span className="text-muted fw-normal">(opcional)</span></label>
                      <input
                        className={`form-control ${errors.email_contato ? "is-invalid" : ""}`}
                        type="email"
                        name="email_contato"
                        value={formData.email_contato}
                        onChange={handleChange}
                        placeholder="Seu email para retorno"
                      />
                      {errors.email_contato && <div className="invalid-feedback">{errors.email_contato}</div>}
                    </div>
                  </div>
                </fieldset>

                <div className="mt-4 feedback-actions">
                  {isAuthenticated ? (
                    <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                      <i className="bi bi-send me-1"></i> {""}
                      {loading ? "Enviando..." : "Enviar feedback"}
                    </button>
                  ) : (
                    <div className="feedback-btn-disabled-wrapper">
                      <button
                        type="button"
                        className="btn btn-primary px-4"
                        disabled
                      >
                        <i className="bi bi-lock-fill me-1"></i> Enviar feedback
                      </button>
                      <span className="feedback-btn-tooltip">
                        <i className="bi bi-info-circle me-1"></i>
                        Faça login para enviar
                      </span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
