const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método genérico para fazer requisições com autenticação
  async authRequest(endpoint, options = {}) {
    const token = localStorage.getItem("auth_token");
    const url = `${this.baseURL}${endpoint}`;

    console.log("🚀 Fazendo requisição para:", url);
    console.log("📦 Dados:", options.body);

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      console.log("📡 Resposta:", response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Erro da API:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Dados recebidos:", data);
      return data;
    } catch (error) {
      console.error("💥 Erro na requisição:", error);
      throw error;
    }
  }

  // Posts do usuário autenticado
  async savePost(postData) {
    return this.authRequest("/users/save_post", {
      method: "POST",
      body: JSON.stringify(postData),
    });
  }

  async getMyPosts() {
    return this.authRequest("/users/my_posts", {
      method: "GET",
    });
  }

  async updatePost(postId, postData) {
    return this.authRequest(`/users/update_post/${postId}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    });
  }

  async deletePost(postId) {
    return this.authRequest(`/users/delete_post/${postId}`, {
      method: "DELETE",
    });
  }

  // Conteúdos públicos (sem autenticação)
  async getPublishedPosts() {
    const url = `${this.baseURL}/conteudos/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  }

  async getPostById(postId) {
    const url = `${this.baseURL}/conteudos/${postId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  }
}

// Exporta uma instância única do serviço
export default new ApiService();
