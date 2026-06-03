import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/api/bridge";
import { showToast } from "../utils/toastConfig";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../routes/constants";

export default function FeedbackSection() {
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
    } catch (error) {
      console.error(error);
      showToast.error("Não foi possível enviar seu feedback agora.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="feedback" className="bg-white py-5">
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-12 col-md-5 mb-5 mb-md-0 pe-md-5 text-center text-md-start">
            <h2 className="jersey-25-regular fw-bold mb-3 d-flex align-items-center justify-content-center justify-content-md-start" style={{ color: "#6c2bd7", letterSpacing: "1px" }}>
              <i className="bi bi-lightbulb-fill text-warning me-2 fs-3"></i>
              Sua opinião importa!
            </h2>
            <p className="container home-about-content" style={{ fontSize: "1rem", textAlign: "justify" }}>
              Encontrou um problema ou quer sugerir algo novo? Sua opinião é essencial para nos ajudar a evoluir e melhorar a plataforma para toda a comunidade. Envie-nos seu feedback!
            </p>

            {/* Aviso de login na lateral para a seção da homepage */}
            {!isAuthenticated && (
              <div className="feedback-login-inline mt-3">
                <i className="bi bi-shield-lock-fill me-2"></i>
                <span>
                  <Link to={ROUTES.LOGIN} className="fw-bold">Faça login</Link>
                  {" ou "}
                  <Link to={ROUTES.REGISTER} className="fw-bold">crie uma conta</Link>
                  {" para enviar feedback."}
                </span>
              </div>
            )}
          </div>

          {/* Coluna Direita: Formulário */}
          <div className="col-12 col-md-7">
            <div className={`card border-0 ${!isAuthenticated ? "feedback-form-disabled" : ""}`} style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)", borderRadius: "1rem" }}>
              <div className="card-body p-4 p-lg-5">
                <form onSubmit={handleSubmit} noValidate>
                  <fieldset disabled={!isAuthenticated}>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-bold">Tipo <span className="text-danger">*</span></label>
                        <select
                          className={`form-select border-1 shadow-none ${errors.tipo ? "is-invalid" : ""}`}
                          style={{ borderRadius: "0.5rem" }}
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
                          className={`form-control border-1 shadow-none ${errors.titulo ? "is-invalid" : ""}`}
                          style={{ borderRadius: "0.5rem" }}
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
                          className={`form-control border-1 shadow-none ${errors.descricao ? "is-invalid" : ""}`}
                          style={{ borderRadius: "0.5rem" }}
                          rows="4"
                          name="descricao"
                          value={formData.descricao}
                          onChange={handleChange}
                          placeholder="Descreva com detalhes para conseguirmos entender ou reproduzir"
                          maxLength={2000}
                        ></textarea>
                        {errors.descricao && <div className="invalid-feedback">{errors.descricao}</div>}
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-bold">Email para retorno <span className="text-muted fw-normal">(opcional)</span></label>
                        <input
                          className={`form-control border-1 shadow-none ${errors.email_contato ? "is-invalid" : ""}`}
                          style={{ borderRadius: "0.5rem" }}
                          type="email"
                          name="email_contato"
                          value={formData.email_contato}
                          onChange={handleChange}
                          placeholder="Seu email para entrarmos em contato"
                        />
                        {errors.email_contato && <div className="invalid-feedback">{errors.email_contato}</div>}
                      </div>
                    </div>
                  </fieldset>

                  <div className="mt-4 text-end">
                    {isAuthenticated ? (
                      <button 
                        type="submit" 
                        className="btn px-4 fw-bold w-100 w-md-auto" 
                        disabled={loading}
                        style={{ background: "#6c2bd7", color: "#fff", borderRadius: "0.5rem", padding: "0.75rem 1.5rem" }}
                        onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.1)" }}
                        onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)" }}
                      >
                        <i className="bi bi-send-fill me-2"></i>
                        {loading ? "Enviando..." : "Enviar feedback"}
                      </button>
                    ) : (
                      <div className="feedback-btn-disabled-wrapper">
                        <button 
                          type="button"
                          className="btn px-4 fw-bold w-100 w-md-auto"
                          disabled
                          style={{ background: "#6c2bd7", color: "#fff", borderRadius: "0.5rem", padding: "0.75rem 1.5rem", opacity: 0.5 }}
                        >
                          <i className="bi bi-lock-fill me-2"></i>
                          Enviar feedback
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
    </section>
  );
}
