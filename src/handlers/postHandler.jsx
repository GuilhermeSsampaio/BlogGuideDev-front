import apiService from "../services/api/bridge";
import { useNavigation, useProtectedPage } from "../handlers/globalHandlers";

export const useHandlersPosts = () => {
  const { handleSuccess, handleError } = useProtectedPage();
  const { goToHome } = useNavigation();

  const handleCreatePost = async (postData) => {
    try {
      const newPost = await apiService.createPost(postData);
      console.log(newPost);

      handleSuccess("Post criado com sucesso!");
      goToHome();
    } catch (error) {
      handleError(error, "Erro ao criar post. Tente novamente.");
    }
  };

  return { handleCreatePost };
};
