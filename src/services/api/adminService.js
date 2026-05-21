export default (api) => ({
  async getAdminStats() {
    return api.authRequest("/admin/stats");
  },

  async getAdminUsers() {
    return api.authRequest("/admin/users");
  },

  async adminCreateUser(userData) {
    const token = (await import("../auth")).default.getToken();
    const url = `${api.baseURL}/admin/users`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      let detail = `Erro ao criar usuário (status: ${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData.detail) detail = errorData.detail;
      } catch (e) {
        /* usa mensagem padrão */
      }
      throw new Error(detail);
    }

    return await response.json();
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

  async adminUpdatePost(postId, postData) {
    return api.authRequest(`/admin/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    });
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
