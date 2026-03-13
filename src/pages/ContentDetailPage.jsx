import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import contentData from "../utils/contentData";

export default function ContentDetailPage() {
  const { slug } = useParams();
  const content = contentData.find((item) => item.slug === slug);

  // Simula usuário logado (integrar com seu sistema de autenticação)
  const [isLoggedIn] = useState(true);
  const [comments, setComments] = useState([
    { id: 1, user: "Maria Silva", text: "Excelente conteúdo! Me ajudou muito.", date: "2024-03-10" },
    { id: 2, user: "João Santos", text: "Muito bem explicado, obrigado!", date: "2024-03-12" },
  ]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!content) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4">Conteúdo não encontrado</h2>
        <Link to="/conteudo" className="btn btn-primary">Voltar para Conteúdos</Link>
      </div>
    );
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        user: "Você",
        text: newComment,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setNewComment("");
  };

  return (
    <div className="container py-5 page-detail-container">
      {/* Header */}
      <div className="d-flex align-items-center gap-4 mb-4">
        <img
          src={content.icon}
          alt={content.title}
          className="icon-tema-detail"
        />
        <div>
          <h1 className="fw-bold mb-1 text-title-detail">
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="text-muted mb-2 text-subtitle-detail">
              {content.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Imagem principal */}
      {content.image && (
        <div className="mb-4">
          <img
            src={content.image}
            alt={content.title}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: 400, width: "100%" }}
          />
        </div>
      )}

      {/* Seções de conteúdo */}
      {content.sections.map((section, idx) => (
        <div key={idx} className="mb-4">
          {section.heading && (
            <h2
              className="fw-bold mb-3"
              style={{
                fontSize: "1.5rem",
                paddingBottom: 8,
                display: "inline-block",
                letterSpacing: "0.8px"
              }}
            >
              {section.heading}
            </h2>
          )}

          {section.text && (
            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, textAlign: "justify", whiteSpace: "pre-line" }}>
              {section.text}
            </p>
          )}

          {section.list && (
            <ul className="mb-3" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {section.code && (
            <div className="position-relative">
              <pre
                className="p-4 rounded"
                style={{
                  background: "#1e1e1e",
                  color: "#d4d4d4",
                  fontSize: "0.95rem",
                  overflowX: "auto",
                  border: "1px solid #333",
                }}
              >
                <code>{section.code}</code>
              </pre>
              {section.codeLabel && (
                <span
                  className="position-absolute"
                  style={{
                    top: 8,
                    right: 12,
                    background: "#333",
                    color: "#aaa",
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontSize: "0.75rem",
                  }}
                >
                  {section.codeLabel}
                </span>
              )}
            </div>
          )}

          {section.links && section.links.length > 0 && (
            <div className="mt-3">
              <div className="row g-3">
                {section.links.map((link, i) => (
                  <div className="col-md-6" key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-flex align-items-center gap-2 p-3 rounded text-decoration-none"
                      style={{
                        background: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        color: "#333",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#e9ecef";
                        e.currentTarget.style.borderColor = "#4fc3f7";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f8f9fa";
                        e.currentTarget.style.borderColor = "#dee2e6";
                      }}
                    >
                      <span style={{ fontSize: "1.2rem" }}>{link.icon || "🔗"}</span>
                      <div>
                        <strong style={{ fontSize: "0.95rem" }}>{link.label}</strong>
                        {link.description && (
                          <p className="mb-0 text-muted" style={{ fontSize: "0.85rem" }}>
                            {link.description}
                          </p>
                        )}
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Seção de Comentários */}
      <div className="mt-5 pt-4" style={{ borderTop: "2px solid #eee" }}>
        <h2 className="fw-bold mb-4" style={{ fontSize: "1.5rem" }}>
          Comentários
        </h2>

        {isLoggedIn ? (
          <form onSubmit={handleAddComment} className="mb-4">
            <div className="mb-3">
              <textarea
                className="form-control"
                rows={3}
                placeholder="Deixe seu comentário..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={{ resize: "none" }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar Comentário
            </button>
          </form>
        ) : (
          <div className="alert alert-info mb-4">
            <Link to="/login" className="alert-link">Faça login</Link> para deixar um comentário.
          </div>
        )}

        {comments.length === 0 ? (
          <p className="text-muted">Nenhum comentário ainda. Seja o primeiro!</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3 rounded"
                style={{ background: "#f8f9fa", border: "1px solid #dee2e6" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong style={{ color: "#333" }}>{comment.user}</strong>
                  <small className="text-muted">{comment.date}</small>
                </div>
                <p className="mb-0" style={{ fontSize: "0.95rem" }}>
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botão Voltar */}
      <div className="mt-5 pt-3">
        <Link to="/conteudo" className="btn btn-outline-secondary">
          ← Voltar para Conteúdos
        </Link>
      </div>
    </div>
  );
}
