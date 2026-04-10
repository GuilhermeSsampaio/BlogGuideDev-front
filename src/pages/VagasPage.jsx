import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import apiService from "../services/api/bridge";

function VagaCard({ vaga }) {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const contratoBadge = (tipo) => {
    const map = {
      CLT: "bg-success",
      PJ: "bg-primary",
      Estágio: "bg-info text-dark",
      Freelance: "bg-warning text-dark",
    };
    return map[tipo] || "bg-secondary";
  };

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title azul mb-1" style={{ fontSize: "1.25rem" }}>
              {vaga.titulo}
            </h5>
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-building azul"></i>
              <span className="fw-semibold">{vaga.empresa}</span>
              {vaga.localidade && (
                <>
                  <i className="bi bi-geo-alt text-muted ms-2"></i>
                  <span className="text-muted">{vaga.localidade}</span>
                </>
              )}
            </div>
          </div>
          <div className="d-flex gap-2">
            {vaga.tipo_contrato && (
              <span className={`badge ${contratoBadge(vaga.tipo_contrato)}`}>
                {vaga.tipo_contrato}
              </span>
            )}
          </div>
        </div>

        <p
          className="card-text text-muted mb-3"
          style={{ whiteSpace: "pre-line" }}
        >
          {vaga.descricao.length > 200
            ? vaga.descricao.substring(0, 200) + "..."
            : vaga.descricao}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            <i className="bi bi-person-circle me-1"></i>
            {vaga.recrutador?.username} · {formatDate(vaga.data_criacao)}
          </small>
          <div className="d-flex gap-2">
            {vaga.link && (
              <a
                href={vaga.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary"
              >
                <i className="bi bi-box-arrow-up-right me-1"></i>
                Candidatar-se
              </a>
            )}
            <Link
              to={`/vagas/${vaga.id}`}
              className="btn btn-sm btn-outline-primary"
            >
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function VagaForm({ onSubmit, empresa, submitting }) {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    empresa: empresa || "",
    localidade: "",
    tipo_contrato: "",
    link: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      titulo: "",
      descricao: "",
      empresa: empresa || "",
      localidade: "",
      tipo_contrato: "",
      link: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card border-0 shadow-sm mb-5">
      <div className="card-body">
        <h5 className="azul mb-3 fw-bold" style={{ fontSize: "1.1rem" }}>
          <i className="bi bi-plus-circle me-2"></i>Publicar Vaga
        </h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="titulo"
              placeholder="Título da vaga *"
              value={form.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="empresa"
              placeholder="Empresa *"
              value={form.empresa}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="localidade"
              placeholder="Localidade (ex: Remoto, SP)"
              value={form.localidade}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              name="tipo_contrato"
              value={form.tipo_contrato}
              onChange={handleChange}
            >
              <option value="">Tipo de contrato</option>
              <option value="CLT">CLT</option>
              <option value="PJ">PJ</option>
              <option value="Estágio">Estágio</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="url"
              className="form-control"
              name="link"
              placeholder="Link para candidatura"
              value={form.link}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              name="descricao"
              rows="3"
              placeholder="Descrição da vaga *"
              value={form.descricao}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="col-12 d-flex justify-content-end">
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
      </div>
    </form>
  );
}

export default function VagasPage() {
  const { user, isAuthenticated } = useAuth();
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const isRecrutador = isAuthenticated && user?.tipo_perfil === "recrutador";

  useEffect(() => {
    fetchVagas();
  }, []);

  const fetchVagas = async () => {
    try {
      setLoading(true);
      const data = await apiService.getVagas();
      setVagas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar vagas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    setSubmitting(true);
    try {
      const vaga = await apiService.createVaga(formData);
      setVagas((prev) => [vaga, ...prev]);
    } catch (err) {
      console.error("Erro ao criar vaga:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
        <i
          className="bi bi-briefcase-fill azul"
          style={{ fontSize: "2rem" }}
        ></i>
        <h1 className="azul jersey-25-regular mb-0">Vagas</h1>
      </div>

      {isRecrutador && (
        <VagaForm
          onSubmit={handleCreate}
          empresa={user?.empresa || ""}
          submitting={submitting}
        />
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border azul" role="status"></div>
          <p className="mt-3 text-muted">Carregando vagas...</p>
        </div>
      ) : vagas.length === 0 ? (
        <div className="text-center py-5">
          <i
            className="bi bi-briefcase text-muted"
            style={{ fontSize: "3rem" }}
          ></i>
          <p className="text-muted mt-3">Nenhuma vaga publicada ainda.</p>
        </div>
      ) : (
        vagas.map((v) => <VagaCard key={v.id} vaga={v} />)
      )}
    </div>
  );
}
