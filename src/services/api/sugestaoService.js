export default (api) => ({
  async createSugestao(payload) {
    return api.authRequest("/sugestoes/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getMinhasSugestoes() {
    return api.authRequest("/sugestoes/minhas", {
      method: "GET",
    });
  },
});
