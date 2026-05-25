import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import apiService from "../services/api/bridge";

export default function CriarVagaPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    empresa: user?.empresa || "",
    localidade: "",
    tipo_contrato: "",
    link: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.createVaga(form);
      showSuccess("Vaga publicada com sucesso!");
      navigate("/vagas");
    } catch (err) {
      console.error("Erro ao criar vaga:", err);
      showError("Erro ao publicar vaga. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid py-5 page-detail-container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {/* Header */}
          <div className="mb-4 button-return">
            <Link
              to="/vagas"
              className="btn mb-4"
              style={{ backgroundColor: "#7C3AED", color: "#ffffff", fontWeight: "500" }}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Voltar para Vagas
            </Link>
            <h2 className="text-title-form fw-bold">Publicar Nova Vaga</h2>
          </div>

          {/* Formulário */}
          <div className="card border-1 shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Título */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Título da vaga *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="titulo"
                      placeholder="Ex: Desenvolvedor Full-Stack"
                      value={form.titulo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Empresa */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Empresa *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="empresa"
                      placeholder="Nome da empresa"
                      value={form.empresa}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Localidade */}
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Localidade *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="localidade"
                      placeholder="Ex: Remoto, São Paulo - SP"
                      value={form.localidade}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Tipo de contrato */}
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Tipo de contrato</label>
                    <select
                      className="form-select"
                      name="tipo_contrato"
                      value={form.tipo_contrato}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      <option value="CLT">CLT</option>
                      <option value="PJ">PJ</option>
                      <option value="Estágio">Estágio</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  {/* Link para candidatura */}
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Link para candidatura *</label>
                    <input
                      type="url"
                      className="form-control"
                      name="link"
                      placeholder="https://..."
                      value={form.link}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Descrição */}
                  <div className="col-12">
                    <label className="form-label fw-bold">Descrição da vaga *</label>
                    <textarea
                      className="form-control"
                      name="descricao"
                      rows="6"
                      placeholder="Descreva os requisitos, benefícios e detalhes da vaga..."
                      value={form.descricao}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* Botões */}
                  <div className="col-12 vaga-create-actions">
                    <Link to="/vagas" className="btn btn-outline-danger">
                      Cancelar
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <span className="spinner-border spinner-border-sm me-1"></span>
                      ) : (
                        <i className="bi bi-send me-1"></i>
                      )}
                      Publicar Vaga
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
