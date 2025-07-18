const API_BASE_URL = import.meta.env.VITE_API_URL;

class AuthService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Fazer requisição com token
  async authRequest(endpoint, options = {}) {
    const token = this.getToken();
    const url = `${this.baseURL}${endpoint}`;

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
          this.logout();
          window.location.href = "/login";
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
    const response = await this.authRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    this.setToken(response.access_token);
    this.setUser(response.user);

    return response;
  }

  // Registro
  async register(userData) {
    const response = await this.authRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    return response;
  }

  // Obter usuário atual
  async getCurrentUser() {
    return this.authRequest("/auth/me");
  }

  // Logout
  logout() {
    localStorage.removeItem("auth_token");
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
