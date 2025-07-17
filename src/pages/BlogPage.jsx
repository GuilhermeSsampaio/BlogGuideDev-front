import React from "react";
import BtnCriarPost from "../components/BtnCriarPost";
import PostCard from "../components/PostCard";

export default function BlogPage() {
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
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
}
