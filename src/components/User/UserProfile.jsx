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
    nome: "",
    email: "",
    biografia: "",
    github: "",
    linkedin: "",
  });
  const [isEditing, setIsEditing] = useState(false);
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
        nome: user.nome_completo || user.username || "",
        email: user.email || "",
        biografia: user.bio || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await authService.updateProfile({
        nome_completo: formData.nome,
        bio: formData.biografia,
        github: formData.github,
        linkedin: formData.linkedin,
      });
      await refreshUser();
      showSuccess("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      showError("Erro ao salvar o perfil. Tente novamente.");
    }
  };

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

  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <UserHeader
            formData={formData}
            user={user}
            userStats={userStats}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            showWarning={showWarning}
          />

          <div className="card border-0 shadow-sm">
            <UserTabNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
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
                  handleInputChange={handleInputChange}
                  handleSaveProfile={handleSaveProfile}
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
