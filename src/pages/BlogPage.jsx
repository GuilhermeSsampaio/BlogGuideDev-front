import React from "react";
import BtnCriarPost from "../components/BtnCriarPost";
import PostCard from "../components/PostCard";
import { usePosts } from "../hooks/usePosts";
export default function BlogPage() {
  const { posts, loading, error } = usePosts();
  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border azul" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3 text-muted">Carregando posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Erro ao carregar posts: {error}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }
  return (
    <div>
      <p
        className="text-center m-0 azul jersey-25-regular"
        style={{ fontSize: "1.5rem" }}
      >
        Idéias? Projetos? Tutoriais? Vamos aprender juntos!
      </p>
      <BtnCriarPost />
      <hr />
      {posts.length === 0 ? (
        <div className="container text-center py-5">
          <i className="bi bi-journal-x azul" style={{ fontSize: "3rem" }}></i>
          <h3 className="azul mt-3">Nenhum post encontrado</h3>
          <p className="text-muted">Seja o primeiro a compartilhar algo!</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <PostCard post={post} />
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
