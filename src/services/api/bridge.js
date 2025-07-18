const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://blogguidedev-api.fly.dev";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;

    // Garantir que sempre use HTTPS
    if (this.baseURL && this.baseURL.startsWith("http://")) {
      this.baseURL = this.baseURL.replace("http://", "https://");
      console.warn("⚠️ Convertendo HTTP para HTTPS:", this.baseURL);
    }

    console.log("🌍 API Base URL final:", this.baseURL);
  }

  // Método genérico para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    // Verificação extra para garantir HTTPS
    if (url.startsWith("http://")) {
      console.error("🚨 ERRO: Tentativa de usar HTTP em produção!", url);
      throw new Error("Requisição HTTP bloqueada por política de segurança");
    }

    console.log("🚀 Fazendo requisição para:", url);

    const config = {
      headers: {
        "Content-Type": "application/json",
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

  // Posts
  async getPosts() {
    return this.request("/posts");
  }

  async getPost(id) {
    return this.request(`/posts/${id}`);
  }

  async createPost(postData) {
    return this.request("/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    });
  }

  async updatePost(id, postData) {
    return this.request(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    });
  }

  async deletePost(id) {
    return this.request(`/posts/${id}`, {
      method: "DELETE",
    });
  }

  // Health check
  async healthCheck() {
    return this.request("/health");
  }

  // Teste CORS
  async testCors() {
    return this.request("/debug/cors");
  }
}

// Exporta uma instância única do serviço
export default new ApiService();
