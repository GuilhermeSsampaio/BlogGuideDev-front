export default (api) => ({
  async createSugestao(payload) {
    // Envia sem exigir autenticação — o backend aceita requisição anônima.
    // Se houver token válido, inclui para associar ao usuário.
    const token = localStorage.getItem("auth_token");
    const url = `${api.baseURL}/sugestoes/`;

    const headers = {
      "Content-Type": "application/json",
    };

    // Inclui Authorization apenas se existir token (pode estar expirado,
    // o backend trata isso sem rejeitar a requisição).
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  async getMinhasSugestoes() {
    return api.authRequest("/sugestoes/minhas", {
      method: "GET",
    });
  },
});
