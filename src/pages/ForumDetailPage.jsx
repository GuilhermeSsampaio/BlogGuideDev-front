import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForum } from "../hooks/useForum";
import { useAuth } from "../hooks/useAuth";
import ComentarioSection from "../components/ComentarioSection";
import CurtidaButton from "../components/CurtidaButton";

export default function ForumDetailPage() {
  const { topicId } = useParams();
  const { topic, loading, error, fetchTopic } = useForum();
  const { user, isAuthenticated } = useAuth();

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
    <div className="container py-4 py-md-5 forum-detail-container button-return">
      <Link to="/forum" className="btn mb-4" style={{ backgroundColor: "#7C3AED", color: "#ffffff", fontWeight: "500" }}>
        <i className="bi bi-arrow-left me-1"></i>
        Voltar ao Fórum
      </Link>

      <article>
        <div className="d-flex align-items-center gap-2 mb-1">
          <h1 className="azul fw-bold mb-1 text-title-detail">{topic.titulo}</h1>
          {isAuthenticated && user?.username === topic.autor?.username && (
            <Link
              to={`/forum/editar/${topic.id}`}
              className="btn btn-sm btn-outline-primary ms-auto"
              title="Editar tópico"
            >
              <i className="bi bi-pencil"></i> Editar
            </Link>
          )}
        </div>

        <div className="d-flex align-items-center gap-2 mb-4 text-muted" style={{ fontSize: "0.9rem" }}>
          <i className="bi bi-person-circle" style={{ fontSize: "1rem" }}></i>
          {topic.autor?.username ? (
            <Link to={`/perfil/${topic.autor.username}`} className="text-decoration-none text-muted">
              <span>{topic.autor.username}</span>
            </Link>
          ) : (
            <span>Anônimo</span>
          )}
          <span>·</span>
          <span>{formatDate(topic.data_criacao)}</span>
          {topic.data_atualizacao && (
            <>
              <span>·</span>
              <span>(Editado)</span>
            </>
          )}
        </div>

        {topic.imagem_url && (
          <div className="forum-image-container mb-4">
            <img
              src={topic.imagem_url}
              alt={topic.titulo}
              className="forum-image"
            />
          </div>
        )}

        <div
          className="post-content forum-rich-content"
          dangerouslySetInnerHTML={{ __html: topic.descricao }}
        />

        {topic.tags && topic.tags.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mt-4 mb-2">
            {topic.tags.map((tag) => (
              <span
                key={tag}
                className="badge d-flex align-items-center"
                style={{ backgroundColor: "#7C3AED", fontSize: "0.85rem", padding: "0.4em 0.8em", borderRadius: "16px" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 d-flex gap-3">
          <CurtidaButton tipoReferencia="forum" referenciaId={topic.id} />
        </div>

        <hr className="my-4" />

        <ComentarioSection tipoReferencia="forum" referenciaId={topic.id} />
      </article>
    </div>
  );
}
