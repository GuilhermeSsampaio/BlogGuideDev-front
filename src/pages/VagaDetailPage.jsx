import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import apiService from "../services/api/bridge";
import ComentarioSection from "../components/ComentarioSection";
import CurtidaButton from "../components/CurtidaButton";

export default function VagaDetailPage() {
  const { vagaId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVaga();
  }, [vagaId]);

  const fetchVaga = async () => {
    try {
      setLoading(true);
      const data = await apiService.getVaga(vagaId);
      setVaga(data);
    } catch (err) {
      setError("Vaga não encontrada.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja deletar esta vaga?")) return;
    try {
      await apiService.deleteVaga(vagaId);
      window.location.href = "/vagas";
    } catch (err) {
      console.error("Erro ao deletar vaga:", err);
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border azul mt-5" role="status"></div>
        <p className="mt-3 text-muted">Carregando vaga...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5 mt-5">
        <div className="alert alert-danger">{error}</div>
        <Link to="/vagas" className="btn btn-primary">
          Voltar para Vagas
        </Link>
      </div>
    );
  }

  if (!vaga) return null;

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
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

  const isOwner =
    isAuthenticated &&
    (user?.username === vaga.recrutador?.username ||
      user?.tipo_perfil === "admin");

  return (
    <div className="container py-5" style={{ maxWidth: "1000px" }}>
      <Link to="/vagas" className="btn mb-4" style={{ backgroundColor: "#7C3AED", color: "#ffffff", fontWeight: "500" }}>
        <i className="bi bi-arrow-left me-1"></i>Voltar para Vagas
      </Link>

      <article>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h1 className="azul jersey-25-regular mb-2">{vaga.titulo}</h1>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <span>
                <i className="bi bi-building me-1 azul"></i>
                <strong>{vaga.empresa}</strong>
              </span>
              {vaga.localidade && (
                <span className="text-muted">
                  <i className="bi bi-geo-alt me-1"></i>
                  {vaga.localidade}
                </span>
              )}
              {vaga.tipo_contrato && (
                <span className={`badge ${contratoBadge(vaga.tipo_contrato)}`}>
                  {vaga.tipo_contrato}
                </span>
              )}
            </div>
          </div>
          {isOwner && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleDelete}
            >
              <i className="bi bi-trash me-1"></i>Excluir
            </button>
          )}
        </div>

        <div className="d-flex align-items-center gap-2 mb-4 text-muted">
          <i className="bi bi-person-circle" style={{ fontSize: "1rem" }}></i>
          <span>{vaga.recrutador?.username}</span>
          <span className="fw-bold">·</span>
          <span>{formatDate(vaga.data_criacao)}</span>
        </div>

        <div
          className="post-content"
          style={{ fontSize: "1.1rem", lineHeight: "1.5" }}
        >
          {vaga.descricao.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {vaga.link && (
          <div className="mt-4">
            <a
              href={vaga.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-md"
            >
              <i className="bi bi-box-arrow-up-right me-2"></i>
              Candidatar-se
            </a>
          </div>
        )}

        <div className="mt-4 d-flex gap-3">
          <CurtidaButton tipoReferencia="vaga" referenciaId={vaga.id} />
        </div>

        <hr className="my-4" />

        <ComentarioSection tipoReferencia="vaga" referenciaId={vaga.id} />
      </article>
    </div>
  );
}
