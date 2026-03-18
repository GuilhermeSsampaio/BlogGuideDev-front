import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PostForm from "../components/Posts/PostForm";
import { useProtectedPage } from "../handlers/globalHandlers";
import { useHandlersPosts } from "../handlers/postHandler";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../routes/constants";

export default function CriarPostPage() {
  const { user, loading } = useAuth();
  const { checkAuthentication, handleCancel } = useProtectedPage();
  const { handleCreatePost } = useHandlersPosts();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (!loading && user?.tipo_perfil !== "admin") {
    return <Navigate to={ROUTES.ADMIN} replace />;
  }

  const onCancel = () => {
    handleCancel(`${ROUTES.ADMIN}?tab=posts`);
  };

  return (
    <div>
      <PostForm onSubmit={handleCreatePost} onCancel={onCancel} />
    </div>
  );
}
