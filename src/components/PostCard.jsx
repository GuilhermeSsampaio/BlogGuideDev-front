import React from "react";

export default function PostCard() {
  return (
    <div className="container jersey-25-regular my-4">
      {/* User Info */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <i
          className="bi bi-person-circle azul"
          style={{ fontSize: "1.5rem" }}
        ></i>
        <span className="azul">User</span>
      </div>

      {/* Title and Tags */}
      <div className="mb-3">
        <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
          <h5 className="mb-0 azul">API de receitas</h5>
          <span className="badge bg-success">JavaScript</span>
          <span className="badge bg-warning text-dark">Socorro</span>
        </div>
        <p className="mb-3 text-muted">
          Neste post eu estou criando uma API de receitas que faz um fetch no
          youtube, me ajudem!
        </p>
      </div>

      {/* Media - Full width on mobile */}
      <div
        className="border rounded w-100"
        style={{
          height: "200px",
          backgroundImage: "url('/example.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Desktop Layout - Hidden on mobile */}
    </div>
  );
}
