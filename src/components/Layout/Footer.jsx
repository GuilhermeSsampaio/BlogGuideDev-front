import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import logoBlog from "../../img/logoblogprincipal.png";
import logoUfgd from "../../img/logotipo-ufgd.png";

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
  ];

  return (
    <>
      <footer className="footer pt-3 pt-md-5 pb-2 border-top jersey-25-regular" style={{ borderTop: "2px solid #6c2bd7" }}>
        <div className="container-fluid px-4 px-lg-5">
          <div className="row text-center text-md-start align-items-start gx-5 gy-2 gy-md-4 justify-content-between">
            <div className="col-12 col-md-3 mb-3 mb-md-0 margin-logo-footer">
              <h4 className="jersey-25-regular text-name-footer mb-2 fw-bold footer-brand">
                <span className="footer-brand-main">
                  <img
                    src={logoBlog}
                    alt="BlogGuide"
                    className="logo-blog-footer"
                  />
                  <span className="footer-brand-text">
                    <span style={{ color: "#222" }}>Blog</span>
                    <span style={{ color: "#6c2bd7" }}>Guide</span>
                  </span>
                </span>
                <img
                  src={logoUfgd}
                  alt="UFGD"
                  className="logo-ufgd-footer"
                />
              </h4>
            </div>
            <div className="col-12 col-md-3 mb-2 mb-md-0">
              <h5 className="fw-bold mb-2">Links Importantes</h5>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to={ROUTES.CONTEUDO}
                    className="text-muted text-decoration-none"
                  >
                    Conteúdos
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.FORUM}
                    className="text-muted text-decoration-none"
                  >
                    Fórum
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sobre"
                    className="text-muted text-decoration-none"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.FEEDBACK}
                    className="text-muted text-decoration-none"
                  >
                    Sugestões e Bugs
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-3 mb-2 mb-md-0">
              <h5 className="fw-bold mb-2">Contato</h5>
              <ul className="list-unstyled text-muted" style={{ cursor: "pointer" }}>
                <li>
                  <a
                    href="mailto:guilhermesampaio.dev.contato@gmail.com"
                    className="text-muted text-decoration-none"
                    aria-label="Email"
                  >
                    contatoblogguide@gmail.com
                  </a>
                </li>
                <li>+55 (67) 9999-9999</li>
                <li>Dourados, MS</li>
              </ul>
            </div>
            <div className="col-12 col-md-3">
              <h5 className="fw-bold mb-2">Redes Sociais</h5>
              <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                <a
                  href="https://github.com/GuilhermeSsampaio"
                  className="text-muted fs-4"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/guilhermessampaio/"
                  className="text-muted fs-4"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
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
                  href="mailto:guilhermesampaio.dev.contato@gmail.com"
                  className="text-muted fs-4"
                  aria-label="Email"
                >
                  <i className="bi bi-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2 my-md-4 mx-4" />
        <div
            className="text-center text-muted pb-3"
            style={{ fontSize: "1.1rem" }}
          >
            © 2026 BlogGuide. Todos os direitos reservados.
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
