import React from "react";

export default function PostsTab({ posts, loading, onDelete }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border azul" role="status"></div>
      </div>
    );
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Status</th>
            <th>Data</th>
            <th className="text-end">Ações</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td className="text-muted">{p.author}</td>
              <td>
                {p.published ? (
                  <span className="badge bg-success">Publicado</span>
                ) : (
                  <span className="badge bg-warning text-dark">Rascunho</span>
                )}
              </td>
              <td className="text-muted small">{formatDate(p.created_at)}</td>
              <td className="text-end">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(p.id, p.title)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {posts.length === 0 && (
        <p className="text-center text-muted py-3">Nenhum post encontrado.</p>
      )}
    </div>
  );
}
