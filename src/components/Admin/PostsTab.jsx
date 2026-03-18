import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

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
    <div>
      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        <div>
          <h5 className="mb-1 azul">Posts do admin</h5>
          <p className="text-muted mb-0">
            Crie, acompanhe rascunhos e remova conteúdos publicados.
          </p>
        </div>
        <Link to={ROUTES.CRIAR_POST} className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i>
          Novo post
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Status</th>
              <th>Categoria</th>
              <th>Data</th>
              <th className="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td className="text-muted">{p.author || p.authorName || "—"}</td>
                <td>
                  {p.published ? (
                    <span className="badge bg-success">Publicado</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Rascunho</span>
                  )}
                </td>
                <td className="text-muted">{p.excerpt || "Sem categoria"}</td>
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
    </div>
  );
}
