import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForum } from "../hooks/useForum";
import ComentarioSection from "../components/ComentarioSection";
import CurtidaButton from "../components/CurtidaButton";

export default function ForumDetailPage() {
  const { topicId } = useParams();
  const { topic, loading, error, fetchTopic } = useForum();

  useEffect(() => {
    fetchTopic(topicId);
  }, [topicId]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border azul mt-5" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3 text-muted">Carregando tópico...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5 mt-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
        <Link to="/ideias" className="btn btn-primary">
          Voltar para o fórum
        </Link>
      </div>
    );
  }

  if (!topic) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <Link to="/ideias" className="btn btn-outline-secondary btn-sm mb-4">
        <i className="bi bi-arrow-left me-1"></i>
        Voltar ao Fórum
      </Link>

      <article>
        <div className="d-flex align-items-center gap-2 mb-2">
          <h1 className="azul jersey-25-regular mb-0">{topic.titulo}</h1>
          {topic.tipo && (
            <span className="badge bg-info text-dark">{topic.tipo}</span>
          )}
        </div>

        <div className="d-flex align-items-center gap-2 mb-4 text-muted">
          <i className="bi bi-person-circle" style={{ fontSize: "1.2rem" }}></i>
          <span>{topic.autor?.username || "Anônimo"}</span>
          <span className="mx-2">·</span>
          <span>{formatDate(topic.data_criacao)}</span>
        </div>

        <div
          className="post-content"
          style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
        >
          {topic.descricao.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-4 d-flex gap-3">
          <CurtidaButton tipoReferencia="forum" referenciaId={topic.id} />
        </div>

        <hr className="my-4" />

        <ComentarioSection tipoReferencia="forum" referenciaId={topic.id} />
      </article>
    </div>
  );
}
