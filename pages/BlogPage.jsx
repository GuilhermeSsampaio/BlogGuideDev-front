import React from "react";
import CtaBox from "../src/components/CtaBox";
import PostCard from "../src/components/PostCard";
import BtnCriarPost from "../src/components/BtnCriarPost";

export default function BlogPage() {
  return (
    <div>
      {/* <CtaBox /> */}
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
