import React, { useState } from "react";
import apiService from "../services/api/bridge";
import { showToast } from "../utils/toastConfig";

export default function FeedbackPage() {
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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-4 jersey-25-regular">
            <h1 className="azul mb-0">Sugestões e Bugs</h1>
            <p className="lead text-muted">
              Encontrou um problema ou quer sugerir algo novo? Envie aqui.
            </p>
          </div>
          <div className="card border-1 shadow-sm">
            <div className="card-body p-4 p-md-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Tipo</label>
                    <select
                      className="form-select"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                    >
                      <option value="sugestao">Sugestão</option>
                      <option value="bug">Bug</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Canal de contato</label>
                    <select
                      className="form-select"
                      name="canal_contato"
                      value={formData.canal_contato}
                      onChange={handleChange}
                    >
                      <option value="email">Email</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">Título</label>
                    <input
                      className="form-control"
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
                      className="form-control"
                      rows="6"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleChange}
                      placeholder="Descreva com detalhes para conseguirmos reproduzir/entender"
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">Email ou WhatsApp (opcional)</label>
                    <input
                      className="form-control"
                      name="email_contato"
                      value={formData.email_contato}
                      onChange={handleChange}
                      placeholder="Seu contato para retorno"
                    />
                  </div>
                </div>

                <div className="mt-4 feedback-actions">
                  <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                    <i className="bi bi-send me-1"></i> {""}
                    {loading ? "Enviando..." : "Enviar feedback"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
