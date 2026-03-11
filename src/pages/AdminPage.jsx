import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import apiService from "../services/api/bridge";

function StatsCard({ icon, label, value, color }) {
  return (
    <div className="col-sm-6 col-lg-4 col-xl-3">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body d-flex align-items-center gap-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: 48,
              height: 48,
              background: color,
              color: "#fff",
              fontSize: "1.3rem",
            }}
          >
            <i className={`bi ${icon}`}></i>
          </div>
          <div>
            <div className="text-muted small">{label}</div>
            <div className="fw-bold fs-4">{value}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardTab({ stats, loading }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border azul" role="status"></div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="row g-3">
      <StatsCard
        icon="bi-people"
        label="Usuários"
        value={stats.total_users}
        color="#6c2bd7"
      />
      <StatsCard
        icon="bi-file-earmark-text"
        label="Posts"
        value={stats.total_posts}
        color="#0d6efd"
      />
      <StatsCard
        icon="bi-check-circle"
        label="Publicados"
        value={stats.published_posts}
        color="#198754"
      />
      <StatsCard
        icon="bi-pencil-square"
        label="Rascunhos"
        value={stats.draft_posts}
        color="#ffc107"
      />
      <StatsCard
        icon="bi-chat-square-text"
        label="Tópicos Fórum"
        value={stats.total_topics}
        color="#0dcaf0"
      />
      <StatsCard
        icon="bi-chat-dots"
        label="Comentários"
        value={stats.total_comentarios}
        color="#6f42c1"
      />
      <StatsCard
        icon="bi-heart"
        label="Curtidas"
        value={stats.total_curtidas}
        color="#dc3545"
      />
    </div>
  );
}

function CreateUserForm({ onCreate }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    tipo_perfil: "user",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await onCreate(form);
      setForm({ username: "", email: "", password: "", tipo_perfil: "user" });
    } catch (err) {
      setError(err.message || "Erro ao criar usuário");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h6 className="azul mb-3">
          <i className="bi bi-person-plus me-2"></i>Criar Novo Usuário
        </h6>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="password"
                className="form-control form-control-sm"
                placeholder="Senha"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-sm"
                value={form.tipo_perfil}
                onChange={(e) => setForm({ ...form, tipo_perfil: e.target.value })}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="recrutador">recrutador</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                type="submit"
                className="btn btn-primary btn-sm w-100"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <><i className="bi bi-plus-lg me-1"></i>Criar</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function UsersTab({ users, loading, onChangeRole, onDelete, onCreate }) {
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
      <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Usuário</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verificado</th>
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
              <td className="text-muted">{u.email}</td>
              <td>
                <span className={`badge ${roleBadge(u.tipo_perfil)}`}>
                  {u.tipo_perfil}
                </span>
              </td>
              <td>
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

function PostsTab({ posts, loading, onDelete }) {
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

function ForumTab({ topics, loading, onDelete }) {
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

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  // Redirect non-admin users
  if (!isAuthenticated || user?.tipo_perfil !== "admin") {
    return <Navigate to="/" replace />;
  }

  const loadTab = async (tab) => {
    setActiveTab(tab);
    setLoading(true);
    try {
      switch (tab) {
        case "dashboard":
          setStats(await apiService.getAdminStats());
          break;
        case "users":
          setUsers(await apiService.getAdminUsers());
          break;
        case "posts":
          setPosts(await apiService.getAdminPosts());
          break;
        case "forum":
          setTopics(await apiService.getAdminForum());
          break;
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTab("dashboard");
  }, []);

  const handleChangeRole = async (profileId, newRole) => {
    try {
      await apiService.updateUserRole(profileId, newRole);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === profileId ? { ...u, tipo_perfil: newRole } : u,
        ),
      );
    } catch (err) {
      console.error("Erro ao alterar role:", err);
    }
  };

  const handleCreateUser = async (userData) => {
    const newUser = await apiService.adminCreateUser(userData);
    setUsers((prev) => [...prev, newUser]);
  };

  const handleDeleteUser = async (profileId, username) => {
    if (
      !window.confirm(
        `Tem certeza que deseja deletar o usuário "${username}"? Esta ação é irreversível.`,
      )
    )
      return;
    try {
      await apiService.deleteUser(profileId);
      setUsers((prev) => prev.filter((u) => u.id !== profileId));
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
    }
  };

  const handleDeletePost = async (postId, title) => {
    if (!window.confirm(`Deletar o post "${title}"?`)) return;
    try {
      await apiService.adminDeletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      console.error("Erro ao deletar post:", err);
    }
  };

  const handleDeleteTopic = async (topicId, titulo) => {
    if (!window.confirm(`Deletar o tópico "${titulo}"?`)) return;
    try {
      await apiService.adminDeleteTopic(topicId);
      setTopics((prev) => prev.filter((t) => t.id !== topicId));
    } catch (err) {
      console.error("Erro ao deletar tópico:", err);
    }
  };

  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: "bi-speedometer2" },
    { key: "users", label: "Usuários", icon: "bi-people" },
    { key: "posts", label: "Posts", icon: "bi-file-earmark-text" },
    { key: "forum", label: "Fórum", icon: "bi-chat-square-text" },
  ];

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-3 mb-4">
        <i
          className="bi bi-shield-lock-fill azul"
          style={{ fontSize: "2rem" }}
        ></i>
        <h2 className="azul jersey-25-regular mb-0">Painel Admin</h2>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.key}>
            <button
              className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => loadTab(tab.key)}
            >
              <i className={`bi ${tab.icon} me-1`}></i>
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab content */}
      {activeTab === "dashboard" && (
        <DashboardTab stats={stats} loading={loading} />
      )}
      {activeTab === "users" && (
        <UsersTab
          users={users}
          loading={loading}
          onChangeRole={handleChangeRole}
          onDelete={handleDeleteUser}
          onCreate={handleCreateUser}
        />
      )}
      {activeTab === "posts" && (
        <PostsTab posts={posts} loading={loading} onDelete={handleDeletePost} />
      )}
      {activeTab === "forum" && (
        <ForumTab
          topics={topics}
          loading={loading}
          onDelete={handleDeleteTopic}
        />
      )}
    </div>
  );
}
