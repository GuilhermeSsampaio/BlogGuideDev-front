import postService from "./postService";
import forumService from "./forumService";
import comentarioService from "./comentarioService";
import curtidaService from "./curtidaService";
import adminService from "./adminService";
import vagaService from "./vagaService";
import searchService from "./searchService";
import conteudoEducacionalService from "./conteudoEducacionalService";

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
    );
  }

  async authRequest(endpoint, options = {}) {
    const token = localStorage.getItem("auth_token");
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response.json();
  }
}

export default new ApiService();
