import HomePage from "../pages/HomePage";
import ContentGuidesPage from "../pages/ContentGuidesPage";
import ContentDetailPage from "../pages/ContentDetailPage";
// import PostDetailPage from "../pages/PostDetailPage";
import ForumPage from "../pages/ForumPage";
import ForumDetailPage from "../pages/ForumDetailPage";
import SobrePage from "../pages/SobrePage";
import LoginPage from "../pages/LoginPage";
import GoogleCallbackPage from "../pages/GoogleCallbackPage";
import RegisterPage from "../pages/RegisterPage";
import UserPage from "../pages/UserPage";
import CriarPostPage from "../pages/CriarPostPage";
import EditarPostPage from "../pages/EditarPostPage";
import AdminPage from "../pages/AdminPage";
import VagasPage from "../pages/VagasPage";
import VagaDetailPage from "../pages/VagaDetailPage";
import CriarVagaPage from "../pages/CriarVagaPage";
import EditarVagaPage from "../pages/EditarVagaPage";
import SearchPage from "../pages/SearchPage";
import DiretrizesForumPage from "../pages/DiretrizesForumPage";
import CriarForumPage from "../pages/CriarForumPage";
import EditarForumPage from "../pages/EditarForumPage";
import FeedbackPage from "../pages/FeedbackPage";
import PublicProfilePage from "../pages/PublicProfilePage";
import ComunidadePage from "../pages/ComunidadePage";
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
    component: ContentGuidesPage,
    name: "Conteúdo",
    showInNav: true,
  },
  {
    path: "/conteudo/:slug",
    component: ContentDetailPage,
    name: "Detalhe do Conteúdo",
    showInNav: false,
  },
  // {
  //   path: ROUTES.POST_DETAIL,
  //   component: PostDetailPage,
  //   name: "Detalhe do Post",
  //   showInNav: false,
  // },
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
    path: ROUTES.FEEDBACK,
    component: FeedbackPage,
    name: "Feedback",
    showInNav: false,
  },
  {
    path: ROUTES.LOGIN,
    component: LoginPage,
    name: "Login",
    showInNav: false,
  },
  {
    path: ROUTES.GOOGLE_CALLBACK,
    component: GoogleCallbackPage,
    name: "Google Callback",
    showInNav: false,
  },
  {
    path: ROUTES.REGISTER,
    component: RegisterPage,
    name: "Registrar",
    showInNav: false,
  },
  {
    path: ROUTES.SOBRE,
    component: SobrePage,
    name: "Sobre",
    showInNav: true,
  },
  {
    path: ROUTES.FORUM,
    component: ForumPage,
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
    path: "/perfil/:username",
    component: PublicProfilePage,
    name: "Perfil Público",
    showInNav: false,
  },
  {
    path: ROUTES.COMUNIDADE,
    component: ComunidadePage,
    name: "Comunidade",
    showInNav: false,
  },
];

// Rotas protegidas (precisam de autenticação)
export const protectedRoutes = [
  {
    path: ROUTES.CRIAR_FORUM,
    component: CriarForumPage,
    name: "Criar Tópico",
    showInNav: false,
  },
  {
    path: ROUTES.EDITAR_FORUM,
    component: EditarForumPage,
    name: "Editar Tópico",
    showInNav: false,
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
    path: "/editar-post/:postId",
    component: EditarPostPage,
    name: "Editar Post",
    showInNav: false,
  },
  {
    path: ROUTES.ADMIN,
    component: AdminPage,
    name: "Admin",
    showInNav: false,
  },
  {
    path: "/criar-vaga",
    component: CriarVagaPage,
    name: "Criar Vaga",
    showInNav: false,
  },
  {
    path: "/editar-vaga/:vagaId",
    component: EditarVagaPage,
    name: "Editar Vaga",
    showInNav: false,
  },
  {
    path: ROUTES.DIRETRIZES_FORUM,
    component: DiretrizesForumPage,
    name: "Diretrizes do Fórum",
    showInNav: false,
  },
];

// Todas as rotas juntas
export const allRoutes = [...publicRoutes, ...protectedRoutes];
