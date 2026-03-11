import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";

export default function UserPostsTab({
  posts,
  loading,
  handleDeletePost,
  showWarning,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="azul mb-0">Meus Posts</h5>
        <Link to={ROUTES.CRIAR_POST} className="btn btn-primary btn-sm">
          <i className="bi bi-plus-circle me-1"></i>
          Novo Post
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border azul" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-5">
          <i
            className="bi bi-file-text text-muted"
            style={{ fontSize: "3rem" }}
          ></i>
          <h6 className="text-muted mt-2">Nenhum post encontrado</h6>
          <p className="text-muted small">Comece criando seu primeiro post!</p>
          <Link to={ROUTES.CRIAR_POST} className="btn btn-primary btn-sm">
            <i className="bi bi-plus-circle me-1"></i>
            Criar Post
          </Link>
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {posts.map((post) => (
            <div key={post.id} className="list-group-item border-0 px-0 py-3">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <Link to={`/conteudo/${post.id}`} className="text-decoration-none">
                    <h6 className="azul mb-1">{post.title}</h6>
                  </Link>
                  {post.excerpt && (
                    <p className="text-muted mb-1 small">{post.excerpt}</p>
                  )}
                  <div className="d-flex align-items-center gap-3">
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      {formatDate(post.created_at)}
                    </small>
                    <small className={post.published ? "text-success" : "text-warning"}>
                      <i className={`bi ${post.published ? "bi-globe" : "bi-eye-slash"} me-1`}></i>
                      {post.published ? "Publicado" : "Rascunho"}
                    </small>
                  </div>
                </div>
                <div className="d-flex gap-2 ms-3">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => showWarning(`Editando post: ${post.title}`)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeletePost(post.id, post.title)}
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
