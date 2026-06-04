import React, { useState, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import { useForum } from "../../hooks/useForum";
import authService from "../../services/auth";
import UserHeader from "./UserHeader";
import UserTabNavigation from "./UserTabNavigation";
import UserProfileTab from "./UserProfileTab";
import UserForunsTab from "./UserForunsTab";
import UserConfigTab from "./UserConfigTab";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("perfil");
  const { user, logout, refreshUser } = useAuth();
  const { topics, loading: forunsLoading, fetchTopics, deleteTopic } = useForum();
  const [userStats, setUserStats] = useState({ curtidas: 0, comentarios: 0, foruns: 0 });
  const [userTopics, setUserTopics] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    nome: "",
    email: "",
    biografia: "",
    github: "",
    linkedin: "",
    is_public: false,
    pushEnabled: localStorage.getItem("pwa_push_opt_in") === "true",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const { showSuccess, showError, showWarning } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const stats = await authService.getUserStats();
        setUserStats(stats);
      } catch (err) {
        console.error("Erro ao carregar stats:", err);
      }
      await fetchTopics();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (user && topics.length > 0) {
      const myTopics = topics.filter((t) => t.autor?.username === user.username);
      setUserTopics(myTopics);
    }
  }, [topics, user]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        username: user.username || "",
        nome: user.nome_completo || user.username || "",
        email: user.email || "",
        biografia: user.bio || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        is_public: user.is_public || false,
        pushEnabled: localStorage.getItem("pwa_push_opt_in") === "true",
      }));
    }
  }, [user]);

  useEffect(() => {
    return () => {
      // Evita vazamento de memoria das URLs criadas para preview.
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    try {
      await authService.updateProfile({
        username: formData.username,
        nome_completo: formData.nome,
        bio: formData.biografia,
        github: formData.github,
        linkedin: formData.linkedin,
        is_public: formData.is_public,
      });
      await refreshUser();
      showSuccess("Perfil atualizado com sucesso!");
      setIsEditing(false);
      return true;
    } catch (error) {
      const msg = error?.message || "";
      // Verifica se o erro é relacionado ao username (limite de caracteres, formato, etc.)
      if (msg.toLowerCase().includes("username")) {
        if (formData.username.length > 30) {
          showError(
            `Seu username "${formData.username}" possui ${formData.username.length} caracteres e excede o limite de 30. ` +
            `Altere seu username na aba de Configurações antes de salvar.`
          );
        } else {
          showError(msg);
        }
      } else if (msg.includes("409")) {
        showError("Username já está em uso. Escolha outro.");
      } else {
        showError(msg || "Erro ao salvar o perfil. Tente novamente.");
      }
      return false;
    }
  };

  const resolveProfilePicture = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
    return `${baseUrl}${path}`;
  };

  const [avatarUploading, setAvatarUploading] = useState(false);

  const handleAvatarFileSelected = async (file) => {
    if (!file) return;

    // Show local preview immediately
    const nextUrl = URL.createObjectURL(file);
    if (avatarPreview && avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarPreview(nextUrl);

    // Auto-save avatar right away
    setAvatarUploading(true);
    try {
      const payload = new FormData();
      payload.append("avatar", file);
      const updated = await authService.updateProfileWithAvatar(payload);
      if (updated?.profile_picture) {
        setAvatarPreview(resolveProfilePicture(updated.profile_picture));
      }
      await refreshUser();
      showSuccess("Foto de perfil atualizada!");
    } catch (error) {
      showError("Erro ao salvar a foto de perfil. Tente novamente.");
      // Revert preview on failure
      setAvatarPreview(resolveProfilePicture(user?.profile_picture));
    } finally {
      setAvatarUploading(false);
      setAvatarFile(null);
    }
  };



  const avatarUrl = avatarPreview || resolveProfilePicture(user?.profile_picture);

  const handleDeleteTopic = async (topicId, topicTitle) => {
    if (
      window.confirm(`Tem certeza que deseja excluir o tópico "${topicTitle}"?`)
    ) {
      try {
        await deleteTopic(topicId);
        setUserTopics((prev) => prev.filter((t) => t.id !== topicId));
        const stats = await authService.getUserStats();
        setUserStats(stats);
        showSuccess("Tópico excluído com sucesso!");
      } catch (error) {
        showError("Erro ao excluir o tópico. Tente novamente.");
      }
    }
  };

  const hasUnsavedChanges = React.useMemo(() => {
    if (!user) return false;
    return (
      (formData.username || "").trim().toLowerCase() !== (user.username || "").trim().toLowerCase() ||
      (formData.nome || "").trim() !== (user.nome_completo || user.username || "").trim() ||
      (formData.email || "").trim() !== (user.email || "").trim() ||
      (formData.biografia || "").trim() !== (user.bio || "").trim() ||
      (formData.github || "").trim() !== (user.github || "").trim() ||
      (formData.linkedin || "").trim() !== (user.linkedin || "").trim() ||
      formData.is_public !== (user.is_public || false)
    );
  }, [formData, user]);

  const handleDiscardChanges = () => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        username: user.username || "",
        nome: user.nome_completo || user.username || "",
        email: user.email || "",
        biografia: user.bio || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        is_public: user.is_public || false,
      }));
    }
  };

  const handleTabChange = (newTab) => {
    if (activeTab === "configuracoes" && hasUnsavedChanges && newTab !== "configuracoes") {
      const confirmDiscard = window.confirm(
        "Você possui alterações não salvas nas configurações. Tem certeza que deseja sair e descartá-las?"
      );
      if (confirmDiscard) {
        handleDiscardChanges();
        setActiveTab(newTab);
      }
    } else {
      setActiveTab(newTab);
    }
  };

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    // Intercepta fechamento de aba/recarregamento
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Intercepta cliques em links do header/footer que levam para fora da página
    const handleClick = (e) => {
      const link = e.target.closest("a");
      if (link && link.href) {
        // Se o link for interno e diferente da URL atual
        const currentUrl = new URL(window.location.href);
        const linkUrl = new URL(link.href, window.location.origin);
        
        if (linkUrl.pathname !== currentUrl.pathname) {
          const confirm = window.confirm(
            "Você possui alterações não salvas nas configurações. Tem certeza que deseja sair desta página e descartá-las?"
          );
          if (!confirm) {
            e.preventDefault();
            e.stopPropagation();
          } else {
            handleDiscardChanges();
          }
        }
      }
    };

    // Usar capture phase para pegar o evento antes do React Router
    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [hasUnsavedChanges]);

  return (
    <div className="container-fluid my-5 user-profile-shell">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <UserHeader
            formData={formData}
            user={user}
            userStats={userStats}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            avatarPreview={avatarUrl}
            avatarUploading={avatarUploading}
            onAvatarFileSelected={handleAvatarFileSelected}
          />

          <div className="card border-0 shadow-sm user-profile-card">
            <UserTabNavigation
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              forunsCount={userTopics.length}
            />

            <div className="card-body p-3">
              {activeTab === "perfil" && (
                <UserProfileTab
                  formData={formData}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  handleInputChange={handleInputChange}
                  handleSaveProfile={handleSaveProfile}
                />
              )}

              {activeTab === "foruns" && (
                <UserForunsTab
                  topics={userTopics}
                  loading={forunsLoading}
                  handleDeleteTopic={handleDeleteTopic}
                  showWarning={showWarning}
                />
              )}

              {activeTab === "configuracoes" && (
                <UserConfigTab
                  formData={formData}
                  originalUsername={user?.username || ""}
                  handleInputChange={handleInputChange}
                  handleSaveProfile={handleSaveProfile}
                  hasUnsavedChanges={hasUnsavedChanges}
                  handleDiscardChanges={handleDiscardChanges}
                  showWarning={showWarning}
                  logout={logout}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
