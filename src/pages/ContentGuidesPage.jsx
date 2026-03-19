import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import apiService from "../services/api/bridge";
import { getPostCategoryLabel, normalizePosts } from "../utils/postUtils";

export default function ContentGuidesPage() {
  const [searchParams] = useSearchParams();
  const highlightedPostId = searchParams.get("highlight");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState("");

  const postCategories = [
    { key: "all", label: "Todos" },
    ...Array.from(
      new Set(
        publishedPosts
          .map((post) => getPostCategoryLabel(post))
          .filter(Boolean),
      ),
    ).map((category) => ({
      key: category,
      label: category,
    })),
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? publishedPosts
      : publishedPosts.filter(
          (post) => getPostCategoryLabel(post) === selectedCategory,
        );

  useEffect(() => {
    const loadPublishedPosts = async () => {
      setLoadingPosts(true);
      setPostsError("");

      try {
        const data = await apiService.getPublishedPosts();
        setPublishedPosts(normalizePosts(data));
      } catch (error) {
        console.error("Erro ao carregar posts publicados:", error);
        setPostsError(
          "Não foi possível carregar os posts publicados no momento.",
        );
      } finally {
        setLoadingPosts(false);
      }
    };

    loadPublishedPosts();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-2 text-primary-conteudo">
        Explore o Universo Dev
      </h1>
      <p className="mb-5 text-secondary-conteudo">
        Os guias fixos continuam disponíveis e agora os posts publicados pelo
        admin também aparecem aqui em cards, consumindo a API.
      </p>

      <section className="mb-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: "#333" }}>
              Conteúdos Publicados
            </h2>
            <p className="mb-0 text-secondary-conteudo">
              Guias e tutoriais publicados pelo time de desenvolvimento sobre
              tecnologias, ferramentas e melhores práticas.
            </p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {postCategories.map((category) => (
              <button
                key={category.key}
                className={`btn ${selectedCategory === category.key ? "btn-primary" : "btn-outline-secondary"} btn-sm px-3`}
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {loadingPosts ? (
          <div className="text-center py-5">
            <div className="spinner-border azul" role="status"></div>
            <p className="text-muted mt-3 mb-0">
              Carregando posts publicados...
            </p>
          </div>
        ) : postsError ? (
          <div className="alert alert-warning" role="alert">
            {postsError}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5 text-muted">
              Nenhum post publicado encontrado para esta categoria.
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredPosts.map((post) => (
              <div className="col-md-6 col-lg-4" key={post.id}>
                <Link
                  to={`/conteudo/${post.slug}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card h-100 shadow-sm"
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      border:
                        highlightedPostId === String(post.id)
                          ? "2px solid #6c2bd7"
                          : undefined,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <div className="card-body d-flex align-items-center gap-3">
                      {post.icon ? (
                        <img
                          src={post.icon}
                          alt={post.title}
                          style={{ width: 48, height: 48, flexShrink: 0 }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            flexShrink: 0,
                            background: post.categoryColor || "#6c2bd7",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: "1.5rem",
                          }}
                        >
                          <i className="bi bi-file-earmark-richtext"></i>
                        </div>
                      )}
                      <div style={{ flex: 1 }}>
                        <h5
                          className="card-title mb-1"
                          style={{ color: "#333" }}
                        >
                          {post.title}
                        </h5>
                        <span
                          className="badge mb-2"
                          style={{
                            background: post.categoryColor || "#6c2bd7",
                            color: "#110000",
                            fontSize: "0.8rem",
                            fontWeight: "700",
                          }}
                        >
                          {getPostCategoryLabel(post)}
                        </span>
                        <p
                          className="card-text mb-0"
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "400",
                            color: "#666",
                          }}
                        >
                          {(post.description || post.content || "").slice(
                            0,
                            100,
                          )}
                          {(post.description || post.content || "").length > 100
                            ? "..."
                            : ""}
                        </p>
                        {highlightedPostId === String(post.id) && (
                          <small
                            className="fw-semibold d-block mt-1"
                            style={{ color: "#6c2bd7" }}
                          >
                            Recém-publicado ✨
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
