// Constantes para as rotas
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  IDEIAS: "/ideias",
  SOBRE: "/sobre",
  USUARIO: "/usuario",
  CRIAR_POST: "/criar-post",
};

// Rotas que não precisam de autenticação
export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER];

// Rotas que precisam de autenticação
export const PROTECTED_ROUTES = [
  ROUTES.IDEIAS,
  ROUTES.SOBRE,
  ROUTES.USUARIO,
  ROUTES.CRIAR_POST,
];
