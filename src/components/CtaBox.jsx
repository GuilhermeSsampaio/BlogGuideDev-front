import React from "react";
import PostForm from "./PostForm";

export default function CtaBox() {
  return (
    <div
      className="container azul jersey-25-regular"
      style={{ fontSize: "1.5rem" }}
    >
      {/* <p className="text-center m-0">
        Idéias? Projetos? Tutoriais? Vamos aprender juntos!
      </p> */}
      <div
        className="container azul jersey-25-regular px-3 py-2 d-flex justify-content-center align-itens-center"
        style={{ fontSize: "1.5rem", height: "20vh" }}
      >
        <PostForm />
      </div>
    </div>
  );
}
