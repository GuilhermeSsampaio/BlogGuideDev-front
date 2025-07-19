import { toast } from "react-toastify";

// Configurações padrão para todos os toasts
export const defaultToastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Configurações específicas por tipo
export const toastConfigs = {
  success: {
    ...defaultToastConfig,
    autoClose: 3000,
  },
  error: {
    ...defaultToastConfig,
    autoClose: 4000,
  },
  warning: {
    ...defaultToastConfig,
    autoClose: 3500,
  },
  info: {
    ...defaultToastConfig,
    autoClose: 3000,
  },
};

// Funções de toast configuradas
export const showToast = {
  success: (message, customConfig = {}) =>
    toast.success(message, { ...toastConfigs.success, ...customConfig }),

  error: (message, customConfig = {}) =>
    toast.error(message, { ...toastConfigs.error, ...customConfig }),

  warning: (message, customConfig = {}) =>
    toast.warning(message, { ...toastConfigs.warning, ...customConfig }),

  info: (message, customConfig = {}) =>
    toast.info(message, { ...toastConfigs.info, ...customConfig }),

  // Toast personalizado
  custom: (message, type = "default", customConfig = {}) =>
    toast(message, { ...defaultToastConfig, type, ...customConfig }),
};

// Mensagens padrão do sistema
export const systemMessages = {
  auth: {
    loginSuccess: "Login realizado com sucesso!",
    loginError: "Erro ao fazer login. Verifique suas credenciais.",
    logoutSuccess: "Logout realizado com sucesso!",
    registerSuccess: "Cadastro realizado com sucesso!",
    registerError: "Erro ao realizar cadastro.",
    tokenExpired: "Sua sessão expirou. Faça login novamente.",
  },
  posts: {
    createSuccess: "Post criado com sucesso!",
    createError: "Erro ao criar post.",
    updateSuccess: "Post atualizado com sucesso!",
    updateError: "Erro ao atualizar post.",
    deleteSuccess: "Post excluído com sucesso!",
    deleteError: "Erro ao excluir post.",
  },
  general: {
    networkError: "Erro de conexão. Tente novamente.",
    unexpectedError: "Ocorreu um erro inesperado.",
    loading: "Carregando...",
    saveSuccess: "Dados salvos com sucesso!",
    saveError: "Erro ao salvar dados.",
  },
};
