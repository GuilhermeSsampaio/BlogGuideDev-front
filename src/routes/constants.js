// Constantes para as rotas
export const ROUTES = {
  HOME: "/",
  CONTEUDO: "/conteudo",
  POST_DETAIL: "/conteudo/:postId",
  LOGIN: "/login",
  REGISTER: "/register",
  FORUM: "/forum",
  CRIAR_FORUM: "/criar-forum",
  FORUM_DETAIL: "/forum/:topicId",
  SOBRE: "/sobre",
  USUARIO: "/usuario",
  CRIAR_POST: "/criar-post",
  ADMIN: "/admin",
  VAGAS: "/vagas",
  VAGA_DETAIL: "/vagas/:vagaId",
  SEARCH: "/search",
  DIRETRIZES_FORUM: "/diretrizes-forum",
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
  ROUTES.FORUM,
  ROUTES.SOBRE,
  ROUTES.USUARIO,
  ROUTES.CRIAR_POST,
];
