import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/Posts/PostForm";
import { useProtectedPage } from "../handlers/globalHandlers";
import { useHandlersPosts } from "../handlers/postHandler";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { ROUTES } from "../routes/constants";

export default function CriarPostPage() {
  const { user, loading } = useAuth();
  const { checkAuthentication, handleCancel } = useProtectedPage();
  const { handleCreatePost } = useHandlersPosts();
  const { showError } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  useEffect(() => {
    if (!loading && user?.tipo_perfil !== "admin") {
      showError("Você não tem permissão para esta ação");
      navigate("/", { replace: true });
    }
  }, [loading, user, navigate, showError]);

  const onCancel = () => {
    handleCancel(`${ROUTES.ADMIN}?tab=posts`);
  };

  return (
    <div>
      <PostForm onSubmit={handleCreatePost} onCancel={onCancel} />
    </div>
  );
}
