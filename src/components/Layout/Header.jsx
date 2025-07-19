import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="container jersey-25-regular">
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold text-decoration-none azul"
            style={{ fontSize: "2.5rem" }}
            to={ROUTES.HOME}
          >
            BlogGuideDev
          </Link>

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

          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            style={{ fontSize: "1.5rem" }}
          >
            <ul className="navbar-nav ms-auto gap-4">
              <li className="nav-item">
                <Link
                  to={ROUTES.HOME}
                  className={`nav-link ${
                    isActive(ROUTES.HOME) ? "azul fw-bold" : "azul"
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={ROUTES.IDEIAS}
                  className={`nav-link ${
                    isActive(ROUTES.IDEIAS) ? "azul fw-bold" : "azul"
                  }`}
                >
                  Idéias
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={ROUTES.SOBRE}
                  className={`nav-link ${
                    isActive(ROUTES.SOBRE) ? "azul fw-bold" : "azul"
                  }`}
                >
                  Sobre
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={ROUTES.USUARIO}
                  className={`nav-link ${
                    isActive(ROUTES.USUARIO) ? "azul fw-bold" : "azul"
                  }`}
                >
                  <i className="bi bi-person-circle me-1"></i>
                  Perfil
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
