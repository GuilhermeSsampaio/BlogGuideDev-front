import React, { useState } from "react";
import apiService from "../services/api/bridge";
import { showToast } from "../utils/toastConfig";

export default function FeedbackSection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tipo: "sugestao",
    titulo: "",
    descricao: "",
    email_contato: "",
    canal_contato: "email",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          </div>

          {/* Coluna Direita: Formulário */}
          <div className="col-12 col-md-7">
            <div className="card border-0" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)", borderRadius: "1rem" }}>
              <div className="card-body p-4 p-lg-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold">Tipo</label>
                      <select
                        className="form-select border-1 shadow-none"
                        style={{ borderRadius: "0.5rem" }}
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                      >
                        <option value="sugestao">Sugestão</option>
                        <option value="bug">Bug</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold">Título</label>
                      <input
                        className="form-control border-1 shadow-none"
                        style={{ borderRadius: "0.5rem" }}
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Resumo rápido da sugestão ou do problema"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold">Descrição</label>
                      <textarea
                        className="form-control border-1 shadow-none"
                        style={{ borderRadius: "0.5rem" }}
                        rows="4"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descreva com detalhes para conseguirmos entender ou reproduzir"
                        required
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold">Email para retorno (opcional)</label>
                      <input
                        className="form-control border-1 shadow-none"
                        style={{ borderRadius: "0.5rem" }}
                        type="email"
                        name="email_contato"
                        value={formData.email_contato}
                        onChange={handleChange}
                        placeholder="Seu email para entrarmos em contato"
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-end">
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
