import React, { useState } from "react";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState("perfil");

  return (
    <div className="container jersey-25-regular my-4">
      {/* Header do usuário */}
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i
                    className="bi bi-person-fill text-white"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>
                <div>
                  <h3 className="azul mb-0">Guilherme Sampaio</h3>
                  <p className="text-muted mb-1">@guilherme_dev</p>
                  <small className="text-muted">
                    Membro desde Janeiro 2025
                  </small>
                </div>
              </div>

              <div className="row text-center">
                <div className="col-4">
                  <h5 className="azul mb-0">15</h5>
                  <small className="text-muted">Posts</small>
                </div>
                <div className="col-4">
                  <h5 className="azul mb-0">8</h5>
                  <small className="text-muted">Ideias</small>
                </div>
                <div className="col-4">
                  <h5 className="azul mb-0">23</h5>
                  <small className="text-muted">Curtidas</small>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs de navegação */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <ul className="nav nav-tabs card-header-tabs border-0">
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 ${
                      activeTab === "perfil"
                        ? "active azul fw-bold"
                        : "text-muted"
                    }`}
                    onClick={() => setActiveTab("perfil")}
                  >
                    Perfil
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 ${
                      activeTab === "posts"
                        ? "active azul fw-bold"
                        : "text-muted"
                    }`}
                    onClick={() => setActiveTab("posts")}
                  >
                    Meus Posts
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link border-0 ${
                      activeTab === "configuracoes"
                        ? "active azul fw-bold"
                        : "text-muted"
                    }`}
                    onClick={() => setActiveTab("configuracoes")}
                  >
                    Configurações
                  </button>
                </li>
              </ul>
            </div>

            <div className="card-body p-4">
              {/* Conteúdo do Perfil */}
              {activeTab === "perfil" && (
                <div>
                  <h5 className="azul mb-3">Sobre mim</h5>
                  <p className="text-muted mb-4">
                    Desenvolvedor apaixonado por tecnologia, sempre buscando
                    aprender e compartilhar conhecimento com a comunidade.
                    Especializado em React, Node.js e Python.
                  </p>

                  <h6 className="azul mb-2">Tecnologias favoritas</h6>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <span className="badge bg-primary">React</span>
                    <span className="badge bg-success">Node.js</span>
                    <span className="badge bg-info">Python</span>
                    <span className="badge bg-warning text-dark">
                      JavaScript
                    </span>
                    <span className="badge bg-secondary">TypeScript</span>
                  </div>

                  <h6 className="azul mb-2">Links</h6>
                  <div>
                    <p className="mb-1">
                      <i className="bi bi-github me-2"></i>
                      <a href="#" className="azul text-decoration-none">
                        github.com/guilherme
                      </a>
                    </p>
                    <p className="mb-0">
                      <i className="bi bi-linkedin me-2"></i>
                      <a href="#" className="azul text-decoration-none">
                        linkedin.com/in/guilherme
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {/* Conteúdo dos Posts */}
              {activeTab === "posts" && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="azul mb-0">Meus Posts</h5>
                    <button className="btn btn-primary btn-sm">
                      <i className="bi bi-plus-circle me-1"></i>
                      Novo Post
                    </button>
                  </div>

                  <div className="list-group list-group-flush">
                    <div className="list-group-item border-0 px-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="azul mb-1">
                            API de receitas com Node.js
                          </h6>
                          <p className="text-muted mb-1 small">
                            Como criar uma API completa para gerenciar
                            receitas...
                          </p>
                          <small className="text-muted">
                            Publicado há 2 dias
                          </small>
                        </div>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary">
                            Editar
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="list-group-item border-0 px-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="azul mb-1">
                            Introdução ao React Hooks
                          </h6>
                          <p className="text-muted mb-1 small">
                            Guia completo sobre useState e useEffect...
                          </p>
                          <small className="text-muted">
                            Publicado há 1 semana
                          </small>
                        </div>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary">
                            Editar
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Conteúdo das Configurações */}
              {activeTab === "configuracoes" && (
                <div>
                  <h5 className="azul mb-3">Configurações da Conta</h5>

                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nome completo</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Guilherme Sampaio"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        defaultValue="guilherme@email.com"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Biografia</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        defaultValue="Desenvolvedor apaixonado por tecnologia..."
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">GitHub</label>
                      <input
                        type="url"
                        className="form-control"
                        defaultValue="https://github.com/guilherme"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">LinkedIn</label>
                      <input
                        type="url"
                        className="form-control"
                        defaultValue="https://linkedin.com/in/guilherme"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Salvar Alterações
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
