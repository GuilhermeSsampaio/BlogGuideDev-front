export default (api) => ({
  async getComentarios(tipoReferencia, referenciaId) {
    const url = `${api.baseURL}/comentarios/${tipoReferencia}/${referenciaId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  },

  async createComentario(tipoReferencia, referenciaId, conteudo) {
    return api.authRequest(`/comentarios/${tipoReferencia}/${referenciaId}`, {
      method: "POST",
      body: JSON.stringify({ conteudo }),
    });
  },

  async deleteComentario(comentarioId) {
    return api.authRequest(`/comentarios/${comentarioId}`, {
      method: "DELETE",
    });
  },
});
