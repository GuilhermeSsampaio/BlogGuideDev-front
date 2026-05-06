import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForum } from "../hooks/useForum";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.innerText || doc.body.textContent || "").replace(/\s+/g, " ").trim();
}

export default function ForumPage() {
  const { topics, loading, error, fetchTopics, deleteTopic } =
    useForum();
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleDelete = async (topicId) => {
    if (!window.confirm("Tem certeza que deseja excluir este tópico?")) return;
    try {
      await deleteTopic(topicId);
      showSuccess("Tópico excluído com sucesso!");
    } catch (err) {
      showError("Erro ao excluir tópico.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border azul mt-5" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3 text-muted">Carregando fórum...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="text-center mb-3 jersey-25-regular">
        <h1 className="azul">💬 Fórum</h1>
        <p className="text-muted">
          Compartilhe ideias, tire dúvidas e discuta com a comunidade
        </p>
      </div>

      {/* Botão de novo tópico */}
      {isAuthenticated && (
        <div className="text-center mb-4">
          <Link to="/criar-forum" className="btn" style={{ backgroundColor: "#7C3AED", color: "#ffffff", fontWeight: "500", padding: "8px 50px", borderRadius: "5px" }}>
            <i className="bi bi-plus-circle me-1"></i>
            Novo Tópico
          </Link>
        </div>
      )}

      {/* Lista de tópicos */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {topics.length === 0 ? (
        <div className="text-center py-5">
          <i
            className="bi bi-chat-square-text text-muted"
            style={{ fontSize: "3rem" }}
          ></i>
          <h3 className="azul mt-3">Nenhum tópico ainda</h3>
          <p className="text-muted">Seja o primeiro a criar um tópico!</p>
        </div>
      ) : (
        <div className="forum-topics-grid">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/forum/${topic.id}`}
              className="forum-topic-card text-decoration-none text-reset"
            >
              <div className="forum-topic-card-inner">
                <div className="forum-topic-card-top">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="azul fw-bold mb-1">{topic.titulo}</h5>
                    {isAuthenticated && user?.username === topic.autor?.username && (
                      <button
                        className="btn btn-sm btn-outline-danger ms-2 flex-shrink-0"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(topic.id);
                        }}
                        title="Excluir tópico"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </div>

                  {topic.tipo && (
                    <span
                      className="badge bg-info text-dark me-2 mb-2"
                      style={{
                        color: "#222",
                        fontWeight: "700",
                      }}
                    >
                      {topic.tipo}
                    </span>
                  )}

                  <p className="text-muted mb-0" style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
                    {stripHtml(topic.descricao).length > 150
                      ? stripHtml(topic.descricao).substring(0, 150) + "..."
                      : stripHtml(topic.descricao)}
                  </p>
                </div>

                <div className="d-flex align-items-center gap-2 mt-3">
                  <small className="text-muted">
                    <i className="bi bi-person-circle me-1"></i>
                    {topic.autor?.username || "Anônimo"}
                  </small>
                  <span>·</span>
                  <small className="text-muted">
                    <i className="bi bi-calendar me-1"></i>
                    {formatDate(topic.data_criacao)}
                  </small>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
