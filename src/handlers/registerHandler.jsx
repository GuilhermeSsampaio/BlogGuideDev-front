import { useAuth } from "../hooks/useAuth";
import { useProtectedPage } from "./globalHandlers";
import { ROUTES } from "../routes/constants";

export const useHandlersRegister = () => {
  const { register, login } = useAuth();
  const { handleSuccess, handleError } = useProtectedPage();

  const handleRegister = async (userData) => {
    // Validar senhas
    if (userData.password !== userData.confirmPassword) {
      handleError(null, "As senhas não coincidem");
      return;
    }

    try {
      await register({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        tipo_perfil: userData.tipo_perfil || userData.tipoPerfil || "user",
        nome_completo: userData.name || userData.nome_completo || null,
        bio: userData.bio || null,
        cnpj: userData.cnpj || null,
      });

      await login(userData.email, userData.password);

      handleSuccess("Conta criada com sucesso! Bem vindo", ROUTES.FORUM);
    } catch (error) {
      handleError(
        error,
        error.message ||
          "Erro ao criar conta. Verifique os dados e tente novamente.",
      );
    }
  };

  return {
    handleRegister,
  };
};
