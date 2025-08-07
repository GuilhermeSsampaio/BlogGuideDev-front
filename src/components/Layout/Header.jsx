import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

export default function Header() {
  const location = useLocation();
  const togglerRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const handleNavLinkClick = () => {
    // Só fecha o menu se o toggler estiver visível (display != 'none')
    if (
      togglerRef.current &&
      window.getComputedStyle(togglerRef.current).display !== "none"
    ) {
      togglerRef.current.click();
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary jersey-25-regular px-3"
      style={{ borderBottom: "1px solid #e5e5e5" }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Link
            className="navbar-brand fw-bold text-decoration-none"
            style={{ fontSize: "2rem", color: "#6c2bd7", lineHeight: "2rem" }}
            to={ROUTES.HOME}
          >
            <span style={{ color: "#222" }}>Blog</span>
            <span style={{ color: "#6c2bd7" }}>Guide</span>
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          ref={togglerRef}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 mb-2 mb-lg-0">
              {/* Menu: Conteúdo */}
              <li className="nav-item">
                <Link
                  to={ROUTES.CONTEUDO}
                  className={`nav-link ${
                    isActive(ROUTES.CONTEUDO) ? "fw-bold" : ""
                  }`}
                  style={{
                    color: "#222",
                    fontSize: "1.15rem",
                    fontWeight: "normal",
                  }}
                  onClick={handleNavLinkClick}
                >
                  Conteúdo
                </Link>
              </li>
              {/* Menu: Fórum */}
              <li className="nav-item">
                <Link
                  to={ROUTES.IDEIAS}
                  className={`nav-link ${
                    isActive(ROUTES.IDEIAS) ? "fw-bold" : ""
                  }`}
                  style={{ color: "#222", fontSize: "1.15rem" }}
                  onClick={handleNavLinkClick}
                >
                  Fórum
                </Link>
              </li>
              {/* Removido menu Blog */}
            </ul>
            {/* Search input com ícone de lupa */}
            <form
              className="d-flex align-items-center search-form"
              role="search"
              style={{ marginRight: "1rem" }}
            >
              <div className="search-input">
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#888",
                    fontSize: "1.1rem",
                  }}
                >
                  <i className="bi bi-search"></i>
                </span>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Buscar..."
                  aria-label="Search"
                  style={{
                    paddingLeft: "2.2rem",
                    borderRadius: "1.5rem",
                    background: "#fafafa",
                    border: "1px solid #e5e5e5",
                  }}
                />
              </div>
            </form>
            {/* Botão Login roxo */}
            <Link
              to={ROUTES.USUARIO}
              className="btn px-3"
              style={{
                background: "#6c2bd7",
                color: "#fff",
                borderRadius: "1.5rem",
                fontWeight: "500",
                fontSize: "1rem",
                padding: "0.5rem 1.3rem",
                gap: ".5rem",
              }}
              onClick={handleNavLinkClick}
            >
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
