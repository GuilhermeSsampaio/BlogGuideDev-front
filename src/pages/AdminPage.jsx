import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import apiService from "../services/api/bridge";
import DashboardTab from "../components/Admin/DashboardTab";
import UsersTab from "../components/Admin/UsersTab";
import PostsTab from "../components/Admin/PostsTab";
import ForumTab from "../components/Admin/ForumTab";

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "dashboard";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = useMemo(
    () => [
      { key: "dashboard", label: "Dashboard", icon: "bi-speedometer2" },
      { key: "users", label: "Usuários", icon: "bi-people" },
      { key: "posts", label: "Posts", icon: "bi-file-earmark-text" },
      { key: "forum", label: "Fórum", icon: "bi-chat-square-text" },
    ],
    [],
  );

  const loadTab = useCallback(
    async (tab) => {
      setActiveTab(tab);
      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.set("tab", tab);
        return nextParams;
      });
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
          default:
            setStats(await apiService.getAdminStats());
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    },
    [setSearchParams],
  );

  useEffect(() => {
    loadTab(initialTab);
  }, [initialTab, loadTab]);

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
    ) {
      return;
    }

    try {
      await apiService.deleteUser(profileId);
      setUsers((prev) => prev.filter((u) => u.id !== profileId));
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/editar-post/${postId}`);
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

  if (!isAuthenticated || user?.tipo_perfil !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container-fluid my-5" style={{ maxWidth: "1200px" }}>
      <div className="d-flex align-items-center gap-3 mb-4">
        <i
          className="bi bi-shield-lock-fill azul"
          style={{ fontSize: "2rem" }}
        ></i>
        <h2 className="azul jersey-25-regular mb-0">Painel Admin</h2>
      </div>

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
        <PostsTab
          posts={posts}
          loading={loading}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
        />
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
