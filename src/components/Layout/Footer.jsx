import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

export default function Footer() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const tabs = [
    {
      id: ROUTES.HOME,
      label: "Blog",
      icon: "bi-journal-text",
      path: ROUTES.HOME,
    },
    {
      id: ROUTES.IDEIAS,
      label: "Ideias",
      icon: "bi-lightbulb",
      path: ROUTES.IDEIAS,
    },
    {
      id: ROUTES.SOBRE,
      label: "Sobre",
      icon: "bi-info-circle",
      path: ROUTES.SOBRE,
    },
  ];

  return (
    <>
      <footer className="footer bg-body-tertiary pt-5 pb-2 border-top" style={{ borderTop: "2px solid #6c2bd7" }}>
        <div className="container">
          <div className="row text-center text-md-start align-items-start">
            <div className="col-12 col-md-3 mb-4 mb-md-0">
              <h4 className="jersey-25-regular mb-2 fw-bold">
                <span style={{ color: "#222" }}>Blog</span>
                <span style={{ color: "#6c2bd7" }}>Guide</span>
              </h4>
              <p className="text-muted" style={{ fontSize: "1.1rem" }}>
                Plataforma de conhecimento em programação para desenvolvedores de
                todos os níveis.
              </p>
            </div>
            <div className="col-12 col-md-3 mb-4 mb-md-0">
              <h5 className="fw-bold mb-2">Links Importantes</h5>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to={ROUTES.BLOG}
                    className="text-muted text-decoration-none"
                  >
                    Conteúdos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/forum"
                    className="text-muted text-decoration-none"
                  >
                    Fórum
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.SOBRE}
                    className="text-muted text-decoration-none"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contato"
                    className="text-muted text-decoration-none"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-3 mb-4 mb-md-0">
              <h5 className="fw-bold mb-2">Contato</h5>
              <ul className="list-unstyled text-muted">
                <li>contato@codedev.com</li>
                <li>+55 (11) 9999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
            <div className="col-12 col-md-3">
              <h5 className="fw-bold mb-2">Redes Sociais</h5>
              <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                <a
                  href="#"
                  className="text-muted fs-4"
                  aria-label="GitHub"
                >
                  <i className="bi bi-github"></i>
                </a>
                <a
                  href="#"
                  className="text-muted fs-4"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="#"
                  className="text-muted fs-4"
                  aria-label="Twitter"
                >
                  <i className="bi bi-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-muted fs-4"
                  aria-label="Email"
                >
                  <i className="bi bi-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 mx-4" />
        <div
            className="text-center text-muted pb-3"
            style={{ fontSize: "1.1rem" }}
          >
            © 2024 CodeDev. Todos os direitos reservados.
          </div>
      </footer>
      {/* tab navigation */}
      {/* <div className="d-block d-md-none fixed-bottom bg-white border-top shadow">
        <div className="container-fluid">
          <div className="row">
            {tabs.map((tab) => (
              <div key={tab.id} className="col-4 p-0">
                <Link
                  to={tab.path}
                  className={`btn w-100 border-0 py-3 d-flex flex-column align-items-center text-decoration-none ${
                    location.pathname === tab.path
                      ? "text-primary"
                      : "text-muted"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ backgroundColor: "transparent", fontSize: "0.8rem" }}
                >
                  <i
                    className={`${tab.icon} mb-1`}
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                  <span className="jersey-25-regular">{tab.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-block d-md-none" style={{ height: "80px" }}></div> */}
    </>
  );
}
