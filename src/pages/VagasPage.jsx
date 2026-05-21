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
    <div className="card border-1 shadow-sm mb-3">
      <div className="card-body">
        <div className="vaga-card-header">
          <div className="vaga-card-header-info">
            <h5 className="card-title azul mb-1" style={{ fontSize: "1.25rem" }}>
              {vaga.titulo}
            </h5>
            <div className="vaga-card-empresa-row mb-1">
              <i className="bi bi-building azul"></i>
              <span className="fw-semibold">{vaga.empresa}</span>
            </div>
            {vaga.localidade && (
              <div className="vaga-card-local-row mb-2">
                <i className="bi bi-geo-alt text-muted"></i>
                <span className="text-muted">{vaga.localidade}</span>
              </div>
            )}
          </div>
          {vaga.tipo_contrato && (
            <span className={`badge ${contratoBadge(vaga.tipo_contrato)} vaga-card-badge`}>
              {vaga.tipo_contrato}
            </span>
          )}
        </div>

        <p
          className="card-text text-muted mb-3"
          style={{ whiteSpace: "pre-line" }}
        >
          {vaga.descricao.length > 200
            ? vaga.descricao.substring(0, 200) + "..."
            : vaga.descricao}
        </p>

        <div className="vaga-card-footer mt-3">
          <small className="text-muted">
            <i className="bi bi-person-circle me-1"></i>
            {vaga.recrutador?.username} · {formatDate(vaga.data_criacao)}
          </small>
          <div className="vaga-card-actions">
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

export default function VagasPage() {
  const { user, isAuthenticated } = useAuth();
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <div className="text-center mb-4">
          <Link to="/criar-vaga" className="btn" style={{ backgroundColor: "#7C3AED", color: "#ffffff", fontWeight: "500", padding: "8px 50px", borderRadius: "5px" }}>
            <i className="bi bi-plus-circle me-1"></i>
            Publicar Vaga
          </Link>
        </div>
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
