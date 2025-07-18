import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PostForm from "../components/PostForm";
import apiService from "../services/api/bridge";

export default function CriarPostPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirecionar se não estiver autenticado
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleCreatePost = async (postData) => {
    try {
      const newPost = await apiService.createPost(postData);
      console.log(newPost);
      // Mostrar sucesso (você pode usar um toast aqui)
      alert("Post criado com sucesso!");

      // Redirecionar para a página principal
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao criar post. Tente novamente.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <PostForm onSubmit={handleCreatePost} onCancel={handleCancel} />
    </div>
  );
}
