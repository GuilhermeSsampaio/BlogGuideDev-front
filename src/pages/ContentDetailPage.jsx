import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import contentData from "../utils/contentData";
import CurtidaButton from "../components/CurtidaButton";
import ComentarioSection from "../components/ComentarioSection";
import apiService from "../services/api/bridge";

export default function ContentDetailPage() {
  const { slug } = useParams();
  const content = contentData.find((item) => item.slug === slug);
  const [conteudoId, setConteudoId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (slug) {
      apiService
        .getConteudoBySlug(slug)
        .then((data) => setConteudoId(data.id))
        .catch((err) => console.error("Erro ao buscar conteudo:", err));
    }
  }, [slug]);

  if (!content) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4">Conteúdo não encontrado</h2>
        <Link to="/conteudo" className="btn btn-primary">Voltar para Conteúdos</Link>
      </div>
    );
  }

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

      {/* Curtida e Comentários */}
      {conteudoId && (
        <div className="mt-5 pt-4" style={{ borderTop: "2px solid #eee" }}>
          <div className="mb-4">
            <CurtidaButton tipoReferencia="conteudo" referenciaId={conteudoId} />
          </div>
          <ComentarioSection tipoReferencia="conteudo" referenciaId={conteudoId} />
        </div>
      )}

      {/* Botão Voltar */}
      <div className="mt-5 pt-3">
        <Link to="/conteudo" className="btn" style={{ backgroundColor: "#7C3AED", color: "#ffffff", fontWeight: "500" }}>
          ← Voltar para Conteúdos
        </Link>
      </div>
    </div>
  );
}
