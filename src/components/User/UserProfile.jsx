import React, { useState, useEffect } from "react";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import { usePosts } from "../../hooks/usePosts";
import UserHeader from "./UserHeader";
import UserTabNavigation from "./UserTabNavigation";
import UserProfileTab from "./UserProfileTab";
import UserPostsTab from "./UserPostsTab";
import UserConfigTab from "./UserConfigTab";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("perfil");
  const { user, logout } = useAuth();
  const { posts, loading: postsLoading, fetchMyPosts, deletePost } = usePosts();
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
    fetchMyPosts();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nome: user.username || "",
        email: user.email || "",
        biografia: user.bio || "",
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

  const handleDeletePost = async (postId, postTitle) => {
    if (
      window.confirm(`Tem certeza que deseja excluir o post "${postTitle}"?`)
    ) {
      try {
        await deletePost(postId);
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
            posts={posts}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            showWarning={showWarning}
          />

          <div className="card border-0 shadow-sm">
            <UserTabNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              posts={posts}
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
                  posts={posts}
                  loading={postsLoading}
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
