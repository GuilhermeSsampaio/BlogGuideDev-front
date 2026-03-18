export const getPostAuthorName = (post) => {
  if (typeof post?.author === "string" && post.author.trim()) {
    return post.author;
  }

  if (post?.author?.username) {
    return post.author.username;
  }

  if (post?.blogguide_user?.username) {
    return post.blogguide_user.username;
  }

  if (post?.blogguide_user?.nome) {
    return post.blogguide_user.nome;
  }

  if (post?.username) {
    return post.username;
  }

  return "Autor BlogGuide";
};

export const normalizePost = (post) => {
  if (!post) return null;

  const excerpt = post.excerpt || post.categoryLabel || post.category || null;
  const content = post.content || post.description || "";

  return {
    ...post,
    title: post.title || post.titulo || "Sem título",
    content,
    excerpt,
    slug:
      post.slug ||
      (post.title ? post.title.toLowerCase().replace(/\s+/g, "-") : ""),
    image_url: post.image_url || post.image || null,
    categoryLabel: post.categoryLabel || post.category || null,
    categoryColor: post.categoryColor || "#6c2bd7",
    icon: post.icon || null,
    description: post.description || null,
    published: post.published ?? post.is_published ?? true,
    created_at:
      post.created_at || post.data_criacao || new Date().toISOString(),
    updated_at: post.updated_at || post.data_atualizacao || post.created_at,
    authorName: getPostAuthorName(post),
    tags: Array.isArray(post.tags) ? post.tags : excerpt ? [excerpt] : [],
  };
};

export const normalizePosts = (posts) =>
  Array.isArray(posts) ? posts.map(normalizePost).filter(Boolean) : [];

export const getPostCategoryLabel = (post) =>
  normalizePost(post)?.excerpt || "Sem categoria";
