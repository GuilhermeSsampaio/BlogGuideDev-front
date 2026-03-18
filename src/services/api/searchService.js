export default (api) => ({
  async search(query) {
    const url = `${api.baseURL}/search/?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  },
});
