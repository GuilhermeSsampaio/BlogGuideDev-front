const API_BASE_URL = import.meta.env.VITE_API_URL;

class AuthService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  processFailedQueue(error, token = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  // Decodificar JWT e extrair informações
  decodeToken(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  }

  // Verificar se token está expirado
  isTokenExpired(token) {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }

  // Renovar access token usando refresh token
  async refreshAccessToken() {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      this.isRefreshing = false;
      this.processFailedQueue(new Error("Refresh token ausente"));
      return null;
    }

    try {
      const url = `${this.baseURL}/auth/refresh`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
        }
        this.isRefreshing = false;
        this.processFailedQueue(new Error("Falha ao renovar token"));
        return null;
      }

      const data = await response.json();
      this.setToken(data.access_token);
      if (data.refresh_token) {
        this.setRefreshToken(data.refresh_token);
      }

      this.isRefreshing = false;
      this.processFailedQueue(null, data.access_token);

      return data.access_token;
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      this.isRefreshing = false;
      this.processFailedQueue(error);
      return null;
    }
  }

  // Fazer requisição com token
  async authRequest(endpoint, options = {}) {
    let token = this.getToken();
    const url = `${this.baseURL}${endpoint}`;

    // Se token está expirado, tenta renovar antes de fazer a requisição
    if (token && this.isTokenExpired(token)) {
      const newToken = await this.refreshAccessToken();
      if (newToken) {
        token = newToken;
      } else {
        throw new Error("Sessão expirada. Faça login novamente.");
      }
    }

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

      if (!response.ok) {
        if (response.status === 401) {
          // Tenta renovar token uma vez
          const newToken = await this.refreshAccessToken();
          if (newToken) {
            // Retenta requisição com novo token
            config.headers.Authorization = `Bearer ${newToken}`;
            const retryResponse = await fetch(url, config);
            if (!retryResponse.ok) {
              this.logout();
              window.location.href = "/login";
              throw new Error(`HTTP error! status: ${retryResponse.status}`);
            }
            return await retryResponse.json();
          } else {
            this.logout();
            window.location.href = "/login";
          }
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Auth Request failed:", error);
      throw error;
    }
  }

  // Login
  async login(email, password) {
    const url = `${this.baseURL}/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let detail = "Email ou senha incorretos.";
      try {
        const errorData = await response.json();
        if (errorData.detail) detail = errorData.detail;
      } catch (e) {
        /* usa mensagem padrão */
      }
      throw new Error(detail);
    }

    const data = await response.json();
    this.setToken(data.access_token);
    if (data.refresh_token) {
      this.setRefreshToken(data.refresh_token);
    }
    return data;
  }

  // Registro
  async register(userData) {
    const url = `${this.baseURL}/users/register`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      let detail = "Erro ao criar conta. Verifique os dados e tente novamente.";
      try {
        const errorData = await response.json();
        if (errorData.detail) detail = errorData.detail;
      } catch (e) {
        /* usa mensagem padrão */
      }
      throw new Error(detail);
    }

    return await response.json();
  }

  // Verificar disponibilidade de username (rota pública, sem token)
  async checkUsername(username) {
    try {
      const url = `${this.baseURL}/users/check-username/${encodeURIComponent(username)}`;
      const response = await fetch(url);
      if (!response.ok) {
        return { available: false, message: "Erro ao verificar username" };
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao verificar username:", error);
      return { available: false, message: "Erro de conexão ao verificar username" };
    }
  }

  // Obter usuário atual
  async getCurrentUser() {
    return this.authRequest("/users/me");
  }

  // Atualizar perfil
  async updateProfile(profileData) {
    return this.authRequest("/users/edit_profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  // Atualizar perfil com avatar (multipart/form-data)
  async updateProfileWithAvatar(formData) {
    const token = this.getToken();
    const url = `${this.baseURL}/users/edit_profile_with_avatar`;

    // Mantem o Content-Type implicito para multipart/form-data.
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        window.location.href = "/login";
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  // Obter estatísticas do usuário
  async getUserStats() {
    return this.authRequest("/users/me/stats");
  }

  // Logout
  logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    window.location.href = "/";
  }

  // Token management
  setToken(token) {
    localStorage.setItem("auth_token", token);
  }

  getToken() {
    return localStorage.getItem("auth_token");
  }

  setRefreshToken(token) {
    localStorage.setItem("refresh_token", token);
  }

  getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }

  // User management
  setUser(user) {
    localStorage.setItem("user_data", JSON.stringify(user));
  }

  getUser() {
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  }

  // Verificar se está autenticado
  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();
