import React from "react";

export default function UserPostsTab({
  mockPosts,
  handleDeletePost,
  showWarning,
}) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="azul mb-0">Meus Posts</h5>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => showWarning("Redirecionando para criação de post...")}
        >
          <i className="bi bi-plus-circle me-1"></i>
          Novo Post
        </button>
      </div>

      {mockPosts.length === 0 ? (
        <div className="text-center py-5">
          <i
            className="bi bi-file-text text-muted"
            style={{ fontSize: "3rem" }}
          ></i>
          <h6 className="text-muted mt-2">Nenhum post encontrado</h6>
          <p className="text-muted small">Comece criando seu primeiro post!</p>
          <button className="btn btn-primary btn-sm">
            <i className="bi bi-plus-circle me-1"></i>
            Criar Post
          </button>
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {mockPosts.map((post) => (
            <div key={post.id} className="list-group-item border-0 px-0 py-3">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <h6 className="azul mb-1">{post.titulo}</h6>
                  <p className="text-muted mb-1 small">{post.resumo}</p>
                  <div className="d-flex align-items-center gap-3">
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      Publicado {post.dataPublicacao}
                    </small>
                    <small className="text-muted">
                      <i className="bi bi-eye me-1"></i>
                      45 visualizações
                    </small>
                    <small className="text-muted">
                      <i className="bi bi-heart me-1"></i>
                      12 curtidas
                    </small>
                  </div>
                </div>
                <div className="d-flex gap-2 ms-3">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => showWarning(`Editando post: ${post.titulo}`)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeletePost(post.id, post.titulo)}
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
