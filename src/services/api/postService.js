export default (api) => ({
  async savePost(postData) {
    return api.authRequest("/users/save_post", {
      method: "POST",
      body: JSON.stringify(postData),
    });
  },

  async getMyPosts() {
    return api.authRequest("/users/my_posts", {
      method: "GET",
    });
  },

  async updatePost(postId, postData) {
    return api.authRequest(`/users/update_post/${postId}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    });
  },

  async deletePost(postId) {
    return api.authRequest(`/users/delete_post/${postId}`, {
      method: "DELETE",
    });
  },

  async getPublishedPosts() {
    const url = `${api.baseURL}/conteudos/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  },

  async getPostById(postId) {
    const url = `${api.baseURL}/conteudos/${postId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  },
});
