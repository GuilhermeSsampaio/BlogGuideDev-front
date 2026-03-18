export default (api) => ({
  async getVagas() {
    const url = `${api.baseURL}/vagas/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  },

  async getVaga(vagaId) {
    const url = `${api.baseURL}/vagas/${vagaId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  },

  async getMinhasVagas() {
    return api.authRequest("/vagas/minhas/list");
  },

  async createVaga(vagaData) {
    return api.authRequest("/vagas/", {
      method: "POST",
      body: JSON.stringify(vagaData),
    });
  },

  async updateVaga(vagaId, vagaData) {
    return api.authRequest(`/vagas/${vagaId}`, {
      method: "PUT",
      body: JSON.stringify(vagaData),
    });
  },

  async deleteVaga(vagaId) {
    return api.authRequest(`/vagas/${vagaId}`, {
      method: "DELETE",
    });
  },
});
