import { useAuth } from "../hooks/useAuth";
import { useProtectedPage } from "./globalHandlers";
import { ROUTES } from "../routes/constants";

export const useHandlersLogin = () => {
  const { login } = useAuth();
  const { handleSuccess, handleError } = useProtectedPage();

  const handleLogin = async (loginData) => {
    try {
      await login(loginData.email, loginData.password);

      handleSuccess("Login realizado com sucesso!", ROUTES.HOME);
    } catch (error) {
      handleError(error, "Email ou senha incorretos. Tente novamente.");
    }
  };

  return {
    handleLogin,
  };
};
