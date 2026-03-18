import React, { useEffect, useState, useCallback } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/Posts/PostForm";
import { useProtectedPage } from "../handlers/globalHandlers";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../routes/constants";
import apiService from "../services/api/bridge";

export default function EditarPostPage() {
  const { user, loading: authLoading } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();
  const { checkAuthentication } = useProtectedPage();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) {
        setError("ID do post não fornecido");
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiService.getPostById(postId);
        const postData = response.data || response;
        setPost(postData);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar post:", err);
        setError("Não foi possível carregar o post para edição");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  const handleUpdatePost = useCallback(
    async (postData) => {
      try {
        await apiService.updatePost(postId, postData);
        navigate(`${ROUTES.ADMIN}?tab=posts`, { replace: true });
      } catch (error) {
        console.error("Erro ao atualizar post:", error);
        throw error;
      }
    },
    [postId, navigate],
  );

  const handleCancel = useCallback(() => {
    navigate(`${ROUTES.ADMIN}?tab=posts`, { replace: true });
  }, [navigate]);

  if (!authLoading && user?.tipo_perfil !== "admin") {
    return <Navigate to={ROUTES.ADMIN} replace />;
  }

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border azul" role="status" />
        <p className="mt-3 text-muted">Carregando post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Erro!</h4>
          <p>{error || "Post não encontrado"}</p>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleCancel}
          >
            Voltar para Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <PostForm
      initialData={post}
      onSubmit={handleUpdatePost}
      onCancel={handleCancel}
    />
  );
}
