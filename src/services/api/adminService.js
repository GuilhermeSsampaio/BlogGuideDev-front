export default (api) => ({
  async getAdminStats() {
    return api.authRequest("/admin/stats");
  },

  async getAdminUsers() {
    return api.authRequest("/admin/users");
  },

  async adminCreateUser(userData) {
    return api.authRequest("/admin/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  async updateUserRole(profileId, tipoPerfil) {
    return api.authRequest(`/admin/users/${profileId}/role`, {
      method: "PUT",
      body: JSON.stringify({ tipo_perfil: tipoPerfil }),
    });
  },

  async deleteUser(profileId) {
    return api.authRequest(`/admin/users/${profileId}`, {
      method: "DELETE",
    });
  },

  async getAdminPosts() {
    return api.authRequest("/admin/posts");
  },

  async adminDeletePost(postId) {
    return api.authRequest(`/admin/posts/${postId}`, {
      method: "DELETE",
    });
  },

  async getAdminForum() {
    return api.authRequest("/admin/forum");
  },

  async adminDeleteTopic(topicId) {
    return api.authRequest(`/admin/forum/${topicId}`, {
      method: "DELETE",
    });
  },
});
