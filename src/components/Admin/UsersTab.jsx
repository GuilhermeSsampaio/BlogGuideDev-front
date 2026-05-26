import React, { useState, useMemo } from "react";
import CreateUserForm from "./CreateUserForm";

export default function UsersTab({
  users,
  loading,
  onChangeRole,
  onDelete,
  onCreate,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const term = searchTerm.toLowerCase().trim();
    return users.filter(
      (u) =>
        u.username?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term) ||
        u.tipo_perfil?.toLowerCase().includes(term),
    );
  }, [users, searchTerm]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border azul" role="status"></div>
      </div>
    );
  }

  const roleBadge = (role) => {
    const map = {
      admin: "bg-danger",
      recrutador: "bg-info text-dark",
      user: "bg-secondary",
    };
    return map[role] || "bg-secondary";
  };

  return (
    <div>
      <CreateUserForm onCreate={onCreate} />

      {/* Barra de pesquisa */}
      <div className="admin-search-bar mb-3">
        <div className="position-relative">
          <i className="bi bi-search admin-search-icon"></i>
          <input
            type="text"
            className="form-control admin-search-input"
            placeholder="Pesquisar por nome, email ou role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="btn btn-link admin-search-clear"
              onClick={() => setSearchTerm("")}
              title="Limpar pesquisa"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>
        {searchTerm && (
          <small className="text-muted mt-1 d-block">
            {filteredUsers.length} usuário{filteredUsers.length !== 1 ? "s" : ""} encontrado{filteredUsers.length !== 1 ? "s" : ""}
          </small>
        )}
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle tables-admin">
          <thead className="table-light">
            <tr>
              <th>Usuário</th>
              <th className="d-none d-md-table-cell">Email</th>
              <th className="d-none d-md-table-cell">Role</th>
              <th className="d-none d-md-table-cell">Verificado</th>
              <th className="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  <i className="bi bi-search me-2"></i>
                  Nenhum usuário encontrado
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-person-circle azul"></i>
                      <span
                        className="text-truncate d-inline-block"
                        style={{ fontSize: "0.95rem", fontWeight: "500", maxWidth: 220 }}
                        title={u.username}
                      >
                        {u.username}
                      </span>
                    </div>
                    <span className={`badge mt-1 d-inline-block d-md-none ${roleBadge(u.tipo_perfil)}`}>
                      {u.tipo_perfil}
                    </span>
                  </td>
                  <td
                    className="d-none d-md-table-cell text-muted text-truncate"
                    style={{ maxWidth: 220, fontSize: "0.875rem", whiteSpace: "nowrap" }}
                    title={u.email}
                  >
                    {u.email}
                  </td>
                  <td className="d-none d-md-table-cell">
                    <span className={`badge ${roleBadge(u.tipo_perfil)}`}>
                      {u.tipo_perfil}
                    </span>
                  </td>
                  <td className="d-none d-md-table-cell text-muted text-truncate" style={{maxWidth: 120}}>
                    {u.verified ? (
                      <i className="bi bi-check-circle-fill text-success"></i>
                    ) : (
                      <i className="bi bi-x-circle text-muted"></i>
                    )}
                  </td>
                  <td className="text-end">
                    <div className="dropdown d-inline-block me-2">
                      <button
                        className="btn btn-sm btn-outline-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        Role
                      </button>
                      <ul className="dropdown-menu">
                        {["user", "admin", "recrutador"].map((role) => (
                          <li key={role}>
                            <button
                              className={`dropdown-item ${u.tipo_perfil === role ? "active" : ""}`}
                              onClick={() => onChangeRole(u.id, role)}
                              disabled={u.tipo_perfil === role}
                            >
                              {role}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(u.id, u.username)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
