export default (api) => ({
  async toggleCurtida(tipoReferencia, referenciaId) {
    return api.authRequest(`/curtidas/${tipoReferencia}/${referenciaId}`, {
      method: "POST",
    });
  },

  async getCurtidas(tipoReferencia, referenciaId) {
    const url = `${api.baseURL}/curtidas/${tipoReferencia}/${referenciaId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  },

  async getCurtidasWithUser(tipoReferencia, referenciaId) {
    return api.authRequest(`/curtidas/${tipoReferencia}/${referenciaId}/me`, {
      method: "GET",
    });
  },
});
