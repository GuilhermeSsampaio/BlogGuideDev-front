import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

export default function PostsTab({ posts, loading, onDelete, onEdit }) {
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // Filtrar posts com base no termo de busca
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;

    const lowerSearch = searchTerm.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerSearch) ||
        (p.author || p.authorName || "").toLowerCase().includes(lowerSearch) ||
        (p.excerpt || "").toLowerCase().includes(lowerSearch),
    );
  }, [posts, searchTerm]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border azul" role="status"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4" style={{ flexWrap: "wrap" }}>
        <div>
          <h5 className="mb-1 azul">Posts do admin</h5>
          <p className="text-muted mb-0">
            Crie, acompanhe rascunhos e remova conteúdos publicados.
          </p>
        </div>
        <Link to={ROUTES.CRIAR_POST} className="btn" style={{ backgroundColor: "#7C3AED", color: "#ffffff", fontWeight: "500", padding: "8px 50px", borderRadius: "5px" }}>
          <i className="bi bi-plus-lg me-2"></i>
          Novo post
        </Link>
      </div>

      {/* Barra de Pesquisa */}
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Pesquisar por título, autor ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setSearchTerm("")}
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
      </div>

      <div>
        <table className="table table-hover align-middle tables-admin">
          <thead className="table-light">
            <tr>
              <th>Título</th>
              <th className="d-none d-md-table-cell">Autor</th>
              <th>Status</th>
              <th className="d-none d-md-table-cell">Categoria</th>
              <th className="d-none d-md-table-cell">Data</th>
              <th className="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((p) => (
              <tr key={p.id}>
                <td style={{whiteSpace: "normal", wordBreak: "break-word"}}>
                  <span className="fw-500">{p.title}</span>
                </td>
                <td className="d-none d-md-table-cell text-muted text-truncate" style={{maxWidth: 120}}>
                  {p.author || p.authorName || "—"}
                </td>
                <td>
                  {p.published ? (
                    <span className="badge bg-success">Publicado</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Rascunho</span>
                  )}
                </td>
                <td className="d-none d-md-table-cell text-muted text-truncate" style={{maxWidth: 120}}>{p.excerpt || "Sem categoria"}</td>
                <td className="d-none d-md-table-cell text-muted small">{formatDate(p.created_at)}</td>
                <td className="text-end">
                  <div className="btn-group btn-group-sm" role="group">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => onEdit(p.id)}
                      title="Editar post"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(p.id, p.title)}
                      title="Deletar post"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPosts.length === 0 && (
          <p className="text-center text-muted py-3">
            {searchTerm
              ? "Nenhum post encontrado com esses critérios."
              : "Nenhum post encontrado."}
          </p>
        )}
      </div>

      {/* Informações de resultados */}
      {searchTerm && filteredPosts.length > 0 && (
        <small className="text-muted d-block mt-2">
          Mostrando {filteredPosts.length} de {posts.length} posts
        </small>
      )}
    </div>
  );
}
