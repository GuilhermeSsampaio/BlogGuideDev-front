import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const togglerRef = useRef(null);
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      handleNavLinkClick();
    }
  };

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
      className="navbar navbar-expand-lg bg-body-tertiary navbar-project jersey-25-regular px-3"
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
                    letterSpacing: "0.5px",
                  }}
                  onClick={handleNavLinkClick}
                >
                  Conteúdo
                </Link>
              </li>
              {/* Menu: Fórum */}
              <li className="nav-item">
                <Link
                  to={ROUTES.FORUM}
                  className={`nav-link ${
                    isActive(ROUTES.FORUM) ? "fw-bold" : ""
                  }`}
                  style={{ color: "#222", fontSize: "1.15rem", letterSpacing: "0.5px" }}
                  onClick={handleNavLinkClick}
                >
                  Fórum
                </Link>
              </li>
              {/* Menu: Vagas */}
              <li className="nav-item">
                <Link
                  to={ROUTES.VAGAS}
                  className={`nav-link ${
                    isActive(ROUTES.VAGAS) ? "fw-bold" : ""
                  }`}
                  style={{ color: "#222", fontSize: "1.15rem", letterSpacing: "0.5px" }}
                  onClick={handleNavLinkClick}
                >
                  Vagas
                </Link>
              </li>
              {/* Menu: Admin (só para admins) */}
              {isAuthenticated && user?.tipo_perfil === "admin" && (
                <li className="nav-item">
                  <Link
                    to={ROUTES.ADMIN}
                    className={`nav-link ${
                      isActive(ROUTES.ADMIN) ? "fw-bold" : ""
                    }`}
                    style={{ color: "#dc3545", fontSize: "1.15rem", letterSpacing: "0.5px" }}
                    onClick={handleNavLinkClick}
                  >
                    <i className="bi bi-shield-lock me-1"></i>
                    Admin
                  </Link>
                </li>
              )}
              {/* Removido menu Blog */}
            </ul>
            {/* Search input com ícone de lupa */}
            <form
              className="d-flex align-items-center search-form"
              role="search"
              style={{ marginRight: "1rem" }}
              onSubmit={handleSearch}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    paddingLeft: "2.2rem",
                    borderRadius: "1.5rem",
                    background: "#fafafa",
                    border: "1px solid #e5e5e5",
                  }}
                />
              </div>
            </form>
            {/* Botão Login/Perfil */}
            {isAuthenticated ? (
              <Link
                to={ROUTES.USUARIO}
                className="btn d-flex align-items-center justify-content-center"
                style={{
                  background: "#6c2bd7",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  padding: "0",
                }}
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-person-fill" style={{ fontSize: "1.2rem" }}></i>
              </Link>
            ) : (
              <Link
                to={ROUTES.LOGIN}
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
