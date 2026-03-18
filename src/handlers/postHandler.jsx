import apiService from "../services/api/bridge";
import { useProtectedPage } from "../handlers/globalHandlers";
import { ROUTES } from "../routes/constants";

export const useHandlersPosts = () => {
  const { handleSuccess, handleError } = useProtectedPage();

  const handleCreatePost = async (postData) => {
    try {
      const newPost = await apiService.savePost(postData);
      const postIdentifier = newPost?.slug || newPost?.id;
      const redirectTo = newPost?.published
        ? `${ROUTES.CONTEUDO}?highlight=${newPost.id}`
        : `${ROUTES.ADMIN}?tab=posts`;

      handleSuccess(
        newPost?.published
          ? "Post publicado com sucesso!"
          : "Rascunho salvo com sucesso!",
        redirectTo,
      );

      return newPost;
    } catch (error) {
      handleError(error, "Erro ao criar post. Tente novamente.");
      throw error;
    }
  };

  return { handleCreatePost };
};
