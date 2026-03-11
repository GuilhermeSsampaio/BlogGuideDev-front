import HomePage from "../pages/HomePage"; // nova página
import BlogPage from "../pages/BlogPage";
import PostDetailPage from "../pages/PostDetailPage";
import IdeiasPage from "../pages/IdeiasPage";
import SobrePage from "../pages/SobrePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserPage from "../pages/UserPage";
import CriarPostPage from "../pages/CriarPostPage";
import { ROUTES } from "./constants";

// Rotas públicas (não precisam de autenticação)
export const publicRoutes = [
  {
    path: ROUTES.HOME,
    component: HomePage,
    name: "Home",
    showInNav: true,
  },
  {
    path: ROUTES.CONTEUDO,
    component: BlogPage,
    name: "Conteúdo",
    showInNav: true,
  },
  {
    path: ROUTES.POST_DETAIL,
    component: PostDetailPage,
    name: "Detalhe do Post",
    showInNav: false,
  },
  {
    path: ROUTES.LOGIN,
    component: LoginPage,
    name: "Login",
    showInNav: false,
  },
  {
    path: ROUTES.REGISTER,
    component: RegisterPage,
    name: "Registrar",
    showInNav: false,
  },
];

// Rotas protegidas (precisam de autenticação)
export const protectedRoutes = [
  {
    path: ROUTES.IDEIAS,
    component: IdeiasPage,
    name: "Ideias",
    showInNav: true,
  },
  {
    path: ROUTES.SOBRE,
    component: SobrePage,
    name: "Sobre",
    showInNav: true,
  },
  {
    path: ROUTES.USUARIO,
    component: UserPage,
    name: "Usuário",
    showInNav: true,
  },
  {
    path: ROUTES.CRIAR_POST,
    component: CriarPostPage,
    name: "Criar Post",
    showInNav: true,
  },
];

// Todas as rotas juntas
export const allRoutes = [...publicRoutes, ...protectedRoutes];
