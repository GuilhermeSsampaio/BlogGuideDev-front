export default (api) => ({
  async getNotificacoes() {
    return api.authRequest("/users/notificacoes", {
      method: "GET",
    });
  },

  async markNotificacaoRead(notificacaoId) {
    return api.authRequest(`/users/notificacoes/${notificacaoId}/read`, {
      method: "PUT",
    });
  },

  async markAllNotificacoesRead() {
    return api.authRequest("/users/notificacoes/read-all", {
      method: "PUT",
    });
  },
});
