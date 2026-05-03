import postService from "./postService";
import forumService from "./forumService";
import comentarioService from "./comentarioService";
import curtidaService from "./curtidaService";
import adminService from "./adminService";
import vagaService from "./vagaService";
import searchService from "./searchService";
import conteudoEducacionalService from "./conteudoEducacionalService";
import notificacaoService from "./notificacaoService";
import sugestaoService from "./sugestaoService";
import authService from "../auth";

const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;

    Object.assign(
      this,
      postService(this),
      forumService(this),
      comentarioService(this),
      curtidaService(this),
      adminService(this),
      vagaService(this),
      searchService(this),
      conteudoEducacionalService(this),
      notificacaoService(this),
      sugestaoService(this),
    );
  }

  async authRequest(endpoint, options = {}) {
    return authService.authRequest(endpoint, options);
  }
}

export default new ApiService();
