import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { ROUTES } from "../routes";

export default function PostDetailPage() {
  const { postId } = useParams();
  const { post, loading, error, fetchPostById } = usePosts();

  useEffect(() => {
    fetchPostById(postId);
  }, [postId]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border azul mt-5" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3 text-muted">Carregando conteúdo...</p>
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
        <Link to={ROUTES.CONTEUDO} className="btn btn-primary">
          Voltar para conteúdos
        </Link>
      </div>
    );
  }

  if (!post) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <Link
        to={ROUTES.CONTEUDO}
        className="btn btn-outline-secondary btn-sm mb-4"
      >
        <i className="bi bi-arrow-left me-1"></i>
        Voltar
      </Link>

      <article>
        <h1 className="azul jersey-25-regular mb-3">{post.title}</h1>

        <div className="d-flex align-items-center gap-2 mb-4 text-muted">
          <i className="bi bi-person-circle" style={{ fontSize: "1.2rem" }}></i>
          <span>{post.author?.username || "Anônimo"}</span>
          <span className="mx-2">·</span>
          <span>{formatDate(post.created_at)}</span>
        </div>

        {post.excerpt && <p className="lead text-muted mb-4">{post.excerpt}</p>}

        <div
          className="post-content"
          style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
        >
          {post.content.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
