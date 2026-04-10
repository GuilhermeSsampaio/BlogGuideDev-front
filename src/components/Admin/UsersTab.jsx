import React from "react";
import CreateUserForm from "./CreateUserForm";

export default function UsersTab({
  users,
  loading,
  onChangeRole,
  onDelete,
  onCreate,
}) {
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
      <div style={{ height: "200px" }}>
        <table className="table table-hover align-middle tables-admin">
          <thead className="table-light">
            <tr>
              <th>Usuário</th>
              <th className="d-none d-md-table-cell">Email</th>
              <th>Role</th>
              <th className="d-none d-md-table-cell">Verificado</th>
              <th className="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <i className="bi bi-person-circle me-2 azul"></i>
                  {u.username}
                </td>
                <td className="d-none d-md-table-cell text-muted text-truncate" style={{maxWidth: 120}}>{u.email}</td>
                <td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
