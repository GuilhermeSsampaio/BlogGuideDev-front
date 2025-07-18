import React from "react";

export default function PostCard({ post }) {
  // Dados padrão caso não seja passado nenhum post
  const defaultPost = {
    id: 1,
    title: "API de receitas",
    content:
      "Neste post eu estou criando uma API de receitas que faz um fetch no youtube, me ajudem!",
    author: { name: "User" },
    tags: ["JavaScript", "Socorro"],
    image_url: "/example.png",
    created_at: new Date().toISOString(),
  };

  const postData = post || defaultPost;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="container jersey-25-regular my-4">
      {/* User Info */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <i
          className="bi bi-person-circle azul"
          style={{ fontSize: "1.5rem" }}
        ></i>
        <span className="azul">{postData.author?.name || "User"}</span>
        <small className="text-muted ms-auto">
          {formatDate(postData.created_at)}
        </small>
      </div>

      {/* Title and Tags */}
      <div className="mb-3">
        <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
          <h5 className="mb-0 azul">{postData.title}</h5>
          {postData.tags &&
            postData.tags.map((tag, index) => (
              <span
                key={index}
                className={`badge ${
                  index % 2 === 0 ? "bg-success" : "bg-warning text-dark"
                }`}
              >
                {tag}
              </span>
            ))}
        </div>
        <p className="mb-3 text-muted">{postData.content}</p>
      </div>

      {/* Media - Full width on mobile */}
      {postData.image_url && (
        <div
          className="border rounded w-100"
          style={{
            height: "200px",
            backgroundImage: `url('${postData.image_url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}

      {/* Interaction buttons */}
      <div className="d-flex gap-3 mt-3">
        <button className="btn btn-sm btn-outline-primary">
          <i className="bi bi-heart me-1"></i>
          Curtir
        </button>
        <button className="btn btn-sm btn-outline-secondary">
          <i className="bi bi-chat me-1"></i>
          Comentar
        </button>
        <button className="btn btn-sm btn-outline-info">
          <i className="bi bi-share me-1"></i>
          Compartilhar
        </button>
      </div>
    </div>
  );
}
