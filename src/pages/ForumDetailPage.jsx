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
        <Link to="/forum" className="btn btn-primary">
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
    <div className="container py-5" style={{ maxWidth: "1000px" }}>
      <Link to="/forum" className="btn mb-4" style={{ backgroundColor: "#7C3AED", color: "#ffffff", fontWeight: "500" }}>
        <i className="bi bi-arrow-left me-1"></i>
        Voltar ao Fórum
      </Link>

      <article>
        <div className="d-flex align-items-center gap-2 mb-2">
          <h1 className="azul fw-bold mb-1 text-title-detail">{topic.titulo}</h1>
        </div>

        <div className="d-flex align-items-center gap-2 mb-4 text-muted">
          <i className="bi bi-person-circle" style={{ fontSize: "1rem" }}></i>
          <span>{topic.autor?.username || "Anônimo"}</span>
          <span className="mx-2">·</span>
          <span>{formatDate(topic.data_criacao)}</span>
        </div>

        {topic.imagem_url && (
          <div className="mb-4">
            <img
              src={topic.imagem_url}
              alt={topic.titulo}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        <div
          className="post-content"
          style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
          dangerouslySetInnerHTML={{ __html: topic.descricao }}
        />

        <div className="mt-4 d-flex gap-3">
          <CurtidaButton tipoReferencia="forum" referenciaId={topic.id} />
        </div>

        <hr className="my-4" />

        <ComentarioSection tipoReferencia="forum" referenciaId={topic.id} />
      </article>
    </div>
  );
}
