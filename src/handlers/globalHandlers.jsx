import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../routes/constants";

// Hook para verificação de autenticação
export const useAuthCheck = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const checkAuthentication = (redirectTo = ROUTES.LOGIN) => {
    if (!isAuthenticated) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  return { checkAuthentication, isAuthenticated };
};

// Hook para navegação comum
export const useNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate(ROUTES.HOME);
  const goToLogin = () => navigate(ROUTES.LOGIN);
  const goToRegister = () => navigate(ROUTES.REGISTER);
  const goToIdeias = () => navigate(ROUTES.IDEIAS);
  const goToSobre = () => navigate(ROUTES.SOBRE);
  const goToUsuario = () => navigate(ROUTES.USUARIO);
  const goToCriarPost = () => navigate(ROUTES.CRIAR_POST);

  const goBack = () => navigate(-1);
  const goToRoute = (route) => navigate(route);

  return {
    goToHome,
    goToLogin,
    goToRegister,
    goToIdeias,
    goToSobre,
    goToUsuario,
    goToCriarPost,
    goBack,
    goToRoute,
    navigate,
  };
};

// Hook para handlers de formulários
export const useFormHandlers = () => {
  const { goBack, goToRoute } = useNavigation();

  const handleCancel = (redirectTo = ROUTES.HOME) => {
    goToRoute(redirectTo);
  };

  const handleSuccess = (
    message = "Operação realizada com sucesso!",
    redirectTo = ROUTES.HOME
  ) => {
    alert(message);
    goToRoute(redirectTo);
  };

  const handleError = (
    error,
    customMessage = "Erro ao realizar operação. Tente novamente."
  ) => {
    console.error(error);
    alert(customMessage);
  };

  return {
    handleCancel,
    handleSuccess,
    handleError,
    goBack,
  };
};

// Hook combinado para páginas que precisam de autenticação
export const useProtectedPage = () => {
  const authCheck = useAuthCheck();
  const navigation = useNavigation();
  const formHandlers = useFormHandlers();

  return {
    ...authCheck,
    ...navigation,
    ...formHandlers,
  };
};
