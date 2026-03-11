// Constantes para as rotas
export const ROUTES = {
  HOME: "/",
  CONTEUDO: "/conteudo",
  POST_DETAIL: "/conteudo/:postId",
  LOGIN: "/login",
  REGISTER: "/register",
  IDEIAS: "/ideias",
  FORUM_DETAIL: "/forum/:topicId",
  SOBRE: "/sobre",
  USUARIO: "/usuario",
  CRIAR_POST: "/criar-post",
  ADMIN: "/admin",
};

// Rotas que não precisam de autenticação
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.CONTEUDO,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
];

// Rotas que precisam de autenticação
export const PROTECTED_ROUTES = [
  ROUTES.IDEIAS,
  ROUTES.SOBRE,
  ROUTES.USUARIO,
  ROUTES.CRIAR_POST,
];
