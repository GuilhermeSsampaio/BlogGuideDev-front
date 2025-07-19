import { useAuth } from "../hooks/useAuth";
import { useProtectedPage } from "./globalHandlers";
import { ROUTES } from "../routes/constants";

export const useHandlersRegister = () => {
  const { register } = useAuth();
  const { handleSuccess, handleError } = useProtectedPage();

  const handleRegister = async (userData) => {
    // Validar senhas
    if (userData.password !== userData.confirmPassword) {
      handleError(null, "As senhas não coincidem");
      return;
    }

    try {
      await register({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        bio: userData.bio,
      });

      handleSuccess(
        "Conta criada com sucesso! Faça login para continuar.",
        ROUTES.LOGIN
      );
    } catch (error) {
      handleError(
        error,
        "Erro ao criar conta. Verifique os dados e tente novamente."
      );
    }
  };

  return {
    handleRegister,
  };
};
