export default (api) => ({
  async getConteudoBySlug(slug) {
    const url = `${api.baseURL}/conteudo-educacional/${slug}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    return response.json();
  },
});
