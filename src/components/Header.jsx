import React from "react";

export default function Header() {
  return (
    <div className="container jersey-25-regular">
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container-fluid">
          <a
            className="navbar-brand fw-bold text-decoration-none azul"
            style={{ fontSize: "2.5rem" }}
            href="#"
          >
            BlogGuideDev
          </a>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ boxShadow: "none" }}
          >
            <i className="bi bi-list azul" style={{ fontSize: "2.5rem" }}></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-4">
              <li className="nav-item">
                <a href="#" className="nav-link azul">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link azul">
                  Idéias
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link azul">
                  Sobre
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
