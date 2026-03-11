import HomePage from "../pages/HomePage"; // nova página
import BlogPage from "../pages/BlogPage";
import PostDetailPage from "../pages/PostDetailPage";
import IdeiasPage from "../pages/IdeiasPage";
import ForumDetailPage from "../pages/ForumDetailPage";
import SobrePage from "../pages/SobrePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserPage from "../pages/UserPage";
import CriarPostPage from "../pages/CriarPostPage";
import AdminPage from "../pages/AdminPage";
import VagasPage from "../pages/VagasPage";
import VagaDetailPage from "../pages/VagaDetailPage";
import SearchPage from "../pages/SearchPage";
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
    path: ROUTES.VAGAS,
    component: VagasPage,
    name: "Vagas",
    showInNav: true,
  },
  {
    path: ROUTES.VAGA_DETAIL,
    component: VagaDetailPage,
    name: "Detalhe da Vaga",
    showInNav: false,
  },
  {
    path: ROUTES.SEARCH,
    component: SearchPage,
    name: "Pesquisa",
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
    name: "Fórum",
    showInNav: true,
  },
  {
    path: ROUTES.FORUM_DETAIL,
    component: ForumDetailPage,
    name: "Detalhe do Tópico",
    showInNav: false,
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
  {
    path: ROUTES.ADMIN,
    component: AdminPage,
    name: "Admin",
    showInNav: false,
  },
];

// Todas as rotas juntas
export const allRoutes = [...publicRoutes, ...protectedRoutes];
