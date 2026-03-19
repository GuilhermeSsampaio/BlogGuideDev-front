import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import contentData from "../utils/contentData";
import CurtidaButton from "../components/CurtidaButton";
import ComentarioSection from "../components/ComentarioSection";
import apiService from "../services/api/bridge";
import { normalizePost } from "../utils/postUtils";

function renderInlineMarkdown(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function renderTextSection(text) {
  return text.split(/\n\n+/).map((paragraph, index) => (
    <p key={index} style={{ whiteSpace: "pre-line" }}>
      {renderInlineMarkdown(paragraph)}
    </p>
  ));
}

function ContentArticle({ content, conteudoId }) {
  return (
    <div className="container py-5 page-detail-container">
      <div className="d-flex align-items-center gap-4 mb-4">
        <img
          src={content.icon}
          alt={content.title}
          className="icon-tema-detail"
        />
        <div>
          <h1 className="fw-bold mb-1 text-title-detail">{content.title}</h1>
          {content.subtitle && (
            <p className="text-muted mb-2 text-subtitle-detail">
              {content.subtitle}
            </p>
          )}
        </div>
      </div>

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

          {/* Renderização do texto com ReactMarkdown para interpretar as Tabelas e Negritos */}
          {section.text && (
            <div className="markdown-content" style={{ fontSize: "1.05rem", lineHeight: 1.8, textAlign: "justify" }}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Estilizando a tabela automaticamente com as classes do Bootstrap
                  table: ({node, ...props}) => <table className="table table-bordered table-striped mt-3 mb-4 table-conteudos" {...props} />,
                  thead: ({node, ...props}) => <thead className="table-dark" {...props} />,
                  p: ({node, ...props}) => <p style={{ whiteSpace: "pre-line" }} {...props} />
                }}
              >
                {section.text}
              </ReactMarkdown>
            </div>
          )}

          {section.list && (
            <ul
              className="mb-3"
              style={{ fontSize: "1.05rem", lineHeight: 1.8 }}
            >
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {section.code && (
            <div className="position-relative mt-3 mb-4">
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
                      <span style={{ fontSize: "1.2rem" }}>
                        {link.icon || "🔗"}
                      </span>
                      <div>
                        <strong style={{ fontSize: "0.95rem" }}>
                          {link.label}
                        </strong>
                        {link.description && (
                          <p
                            className="mb-0 text-muted"
                            style={{ fontSize: "0.85rem" }}
                          >
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

      {conteudoId && (
        <div className="mt-5 pt-4" style={{ borderTop: "2px solid #eee" }}>
          <div className="mb-4">
            <CurtidaButton
              tipoReferencia="conteudo"
              referenciaId={conteudoId}
            />
          </div>
          <ComentarioSection
            tipoReferencia="conteudo"
            referenciaId={conteudoId}
          />
        </div>
      )}

      <div className="mt-5 pt-3">
        <Link
          to="/conteudo"
          className="btn"
          style={{
            backgroundColor: "#7C3AED",
            color: "#ffffff",
            fontWeight: "500",
          }}
        >
          ← Voltar para Conteúdos
        </Link>
      </div>
    </div>
  );
}

function PostArticle({ post }) {
  const formattedDate = useMemo(
    () =>
      new Date(post.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    [post.created_at],
  );

  // Se o post tem sections, renderiza igual ao ContentArticle
  if (post.sections && Array.isArray(post.sections)) {
    return (
      <div className="container py-5 page-detail-container">
        <div className="d-flex align-items-center gap-4 mb-4">
          {post.icon && (
            <img
              src={post.icon}
              alt={post.title}
              className="icon-tema-detail"
            />
          )}
          <div>
            <h1 className="fw-bold mb-1 text-title-detail">{post.title}</h1>
            {post.subtitle && (
              <p className="text-muted mb-2 text-subtitle-detail">
                {post.subtitle}
              </p>
            )}
          </div>
        </div>

      {(post.image_url || post.image) && (
        <div className="mb-4">
          <img
            src={post.image_url || post.image}
            alt={post.title}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: 400, width: "100%" }}
          />
        </div>
      )}

      {post.sections && Array.isArray(post.sections) ? (
        post.sections.map((section, idx) => (
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
              <div
                className="markdown-content"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  textAlign: "justify",
                }}
              >
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({node, ...props}) => <table className="table table-bordered table-striped mt-3 mb-4 table-conteudos" {...props} />,
                    thead: ({node, ...props}) => <thead className="table-dark" {...props} />,
                    p: ({node, ...props}) => <p style={{ whiteSpace: "pre-line" }} {...props} />
                  }}
                >
                  {section.text}
                </ReactMarkdown>
              </div>
            )}

            {section.list && (
              <ul
                className="mb-3"
                style={{ fontSize: "1.05rem", lineHeight: 1.8 }}
              >
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {section.code && (
              <div className="position-relative mt-3 mb-4">
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
                        <span style={{ fontSize: "1.2rem" }}>
                          {link.icon || "🔗"}
                        </span>
                        <div>
                          <strong style={{ fontSize: "0.95rem" }}>
                            {link.label}
                          </strong>
                          {link.description && (
                            <p
                              className="mb-0 text-muted"
                              style={{ fontSize: "0.85rem" }}
                            >
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
        ))
      ) : (
        <div
          className="markdown-content"
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.8,
            textAlign: "justify",
          }}
        >
          {post.content && renderTextSection(post.content)}
        </div>
      )}

      <div className="mt-5 pt-4" style={{ borderTop: "2px solid #eee" }}>
        <div className="mb-4">
          <CurtidaButton tipoReferencia="post" referenciaId={post.id} />
        </div>
        <ComentarioSection tipoReferencia="post" referenciaId={post.id} />
      </div>

      <div className="mt-5 pt-3">
        <Link
          to="/conteudo"
          className="btn"
          style={{
            backgroundColor: "#7C3AED",
            color: "#ffffff",
            fontWeight: "500",
          }}
        >
          ← Voltar para Conteúdos
        </Link>
      </div>
    </div>
    );
  }
}

export default function ContentDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postError, setPostError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const loadPost = async () => {
      setLoading(true);
      setPostError("");

      try {
        const data = await apiService.getPostById(slug);
        setPost(normalizePost(data));
      } catch (error) {
        console.error("Erro ao buscar post:", error);
        setPostError("Conteúdo não encontrado.");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

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

  if (post) {
    return <PostArticle post={post} />;
  }

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-3">Conteúdo não encontrado</h2>
      <p className="text-muted mb-4">
        {postError || "Não localizamos esse conteúdo."}
      </p>
      <Link to="/conteudo" className="btn btn-primary">
        Voltar para Conteúdos
      </Link>
    </div>
  );
}
