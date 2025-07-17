import React from "react";
import { Link, useLocation } from "react-router-dom";

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
            to="/"
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

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-4">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${
                    isActive("/") ? "azul fw-bold" : "azul"
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/ideias"
                  className={`nav-link ${
                    isActive("/ideias") ? "azul fw-bold" : "azul"
                  }`}
                >
                  Idéias
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/sobre"
                  className={`nav-link ${
                    isActive("/sobre") ? "azul fw-bold" : "azul"
                  }`}
                >
                  Sobre
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
