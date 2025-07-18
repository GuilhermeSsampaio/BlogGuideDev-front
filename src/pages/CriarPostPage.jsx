import React, { useEffect } from "react";
import PostForm from "../components/PostForm";
import { useProtectedPage } from "../handlers/globalHandlers";
import { useHandlersPosts } from "../handlers/postHandler";

export default function CriarPostPage() {
  const { checkAuthentication, handleCancel } = useProtectedPage();
  const { handleCreatePost } = useHandlersPosts();

  // Verificar autenticação na montagem do componente
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const onCancel = () => {
    handleCancel();
  };

  return (
    <div>
      <PostForm onSubmit={handleCreatePost} onCancel={onCancel} />
    </div>
  );
}
