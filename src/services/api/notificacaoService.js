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

  async getPushPublicKey() {
    return api.authRequest("/users/push/public-key", {
      method: "GET",
    });
  },

  async subscribePush(subscription) {
    return api.authRequest("/users/push/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
    });
  },

  async unsubscribePush(endpoint) {
    return api.authRequest("/users/push/unsubscribe", {
      method: "POST",
      body: JSON.stringify({ endpoint }),
    });
  },
});
