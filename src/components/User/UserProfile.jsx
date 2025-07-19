import React, { useState } from "react";
import { useToast } from "../../hooks/useToast";
import UserHeader from "./UserHeader";
import UserTabNavigation from "./UserTabNavigation";
import UserProfileTab from "./UserProfileTab";
import UserPostsTab from "./UserPostsTab";
import UserConfigTab from "./UserConfigTab";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("perfil");
  const [formData, setFormData] = useState({
    nome: "Guilherme Sampaio",
    email: "guilherme@email.com",
    biografia:
      "Desenvolvedor apaixonado por tecnologia, sempre buscando aprender e compartilhar conhecimento com a comunidade. Especializado em React, Node.js e Python.",
    github: "https://github.com/guilherme",
    linkedin: "https://linkedin.com/in/guilherme",
  });
  const [isEditing, setIsEditing] = useState(false);
  const { showSuccess, showError, showWarning } = useToast();

  const mockPosts = [
    {
      id: 1,
      titulo: "API de receitas com Node.js",
      resumo: "Como criar uma API completa para gerenciar receitas...",
      dataPublicacao: "há 2 dias",
    },
    {
      id: 2,
      titulo: "Introdução ao React Hooks",
      resumo: "Guia completo sobre useState e useEffect...",
      dataPublicacao: "há 1 semana",
    },
    {
      id: 3,
      titulo: "Autenticação JWT em Node.js",
      resumo: "Implementando autenticação segura com JSON Web Tokens...",
      dataPublicacao: "há 2 semanas",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    try {
      console.log("Dados salvos:", formData);
      showSuccess("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      showError("Erro ao salvar o perfil. Tente novamente.");
    }
  };

  const handleDeletePost = (postId, postTitle) => {
    if (
      window.confirm(`Tem certeza que deseja excluir o post "${postTitle}"?`)
    ) {
      try {
        console.log("Post deletado:", postId);
        showSuccess("Post excluído com sucesso!");
      } catch (error) {
        showError("Erro ao excluir o post. Tente novamente.");
      }
    }
  };

  return (
    <div className="container jersey-25-regular my-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <UserHeader
            formData={formData}
            mockPosts={mockPosts}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            showWarning={showWarning}
          />

          <div className="card border-0 shadow-sm">
            <UserTabNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              mockPosts={mockPosts}
            />

            <div className="card-body p-4">
              {activeTab === "perfil" && (
                <UserProfileTab
                  formData={formData}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  handleInputChange={handleInputChange}
                  handleSaveProfile={handleSaveProfile}
                />
              )}

              {activeTab === "posts" && (
                <UserPostsTab
                  mockPosts={mockPosts}
                  handleDeletePost={handleDeletePost}
                  showWarning={showWarning}
                />
              )}

              {activeTab === "configuracoes" && (
                <UserConfigTab
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSaveProfile={handleSaveProfile}
                  showWarning={showWarning}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
