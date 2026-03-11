import React from "react";

export default function ForumTab({ topics, loading, onDelete }) {
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
            <th>Tipo</th>
            <th>Autor</th>
            <th>Data</th>
            <th className="text-end">Ações</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((t) => (
            <tr key={t.id}>
              <td>{t.titulo}</td>
              <td>
                {t.tipo ? (
                  <span className="badge bg-info text-dark">{t.tipo}</span>
                ) : (
                  <span className="text-muted">-</span>
                )}
              </td>
              <td className="text-muted">{t.autor}</td>
              <td className="text-muted small">{formatDate(t.data_criacao)}</td>
              <td className="text-end">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(t.id, t.titulo)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {topics.length === 0 && (
        <p className="text-center text-muted py-3">Nenhum tópico encontrado.</p>
      )}
    </div>
  );
}
