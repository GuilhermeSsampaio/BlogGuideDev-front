import React from "react";
import { Link } from "react-router-dom";

export default function UserForunsTab({
  topics,
  loading,
  handleDeleteTopic,
  showWarning,
}) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="azul mb-0">Meus Fóruns</h5>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border azul" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : topics.length === 0 ? (
        <div className="text-center py-5">
          <i
            className="bi bi-chat-square-text text-muted"
            style={{ fontSize: "3rem" }}
          ></i>
          <h6 className="text-muted mt-2">Nenhum tópico encontrado</h6>
          <p className="text-muted small">
            Participe do fórum criando seu primeiro tópico!
          </p>
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="list-group-item border-0 px-0 py-3"
            >
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <Link
                    to={`/forum/${topic.id}`}
                    className="text-decoration-none"
                  >
                    <h6 className="azul mb-1">{topic.titulo}</h6>
                  </Link>
                  {topic.tipo && (
                    <span className="badge bg-info text-dark me-2">
                      {topic.tipo}
                    </span>
                  )}
                  <p className="text-muted mb-1 small">
                    {topic.descricao && topic.descricao.length > 100
                      ? topic.descricao.substring(0, 100) + "..."
                      : topic.descricao}
                  </p>
                  <small className="text-muted">
                    <i className="bi bi-calendar me-1"></i>
                    {formatDate(topic.data_criacao)}
                  </small>
                </div>
                <div className="d-flex gap-2 ms-3">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() =>
                      handleDeleteTopic(topic.id, topic.titulo)
                    }
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
