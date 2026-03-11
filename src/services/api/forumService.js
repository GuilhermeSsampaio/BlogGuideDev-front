export default (api) => ({
  async getForumTopics() {
    const url = `${api.baseURL}/forum/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  },

  async getForumTopic(topicId) {
    const url = `${api.baseURL}/forum/${topicId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  },

  async createForumTopic(topicData) {
    return api.authRequest("/forum/", {
      method: "POST",
      body: JSON.stringify(topicData),
    });
  },

  async deleteForumTopic(topicId) {
    return api.authRequest(`/forum/${topicId}`, {
      method: "DELETE",
    });
  },
});
