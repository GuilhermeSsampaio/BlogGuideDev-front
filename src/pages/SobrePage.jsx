import React from "react";

export default function SobrePage() {
  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="text-center mb-5 jersey-25-regular">
            <h1 className="azul mb-0">Sobre o BlogGuide</h1>
            <p className="lead text-muted">
              Uma plataforma para desenvolvedores compartilharem conhecimento
            </p>
          </div>

          <div className="card border-0 shadow-sm mb-4 jersey-25-regular">
            <div className="card-body p-4">
              <h3 className="azul mb-3">🚀 Nossa Missão</h3>
              <p>
                O BlogGuide foi criado para ser um espaço onde desenvolvedores
                podem compartilhar suas experiências, projetos e aprender uns
                com os outros.
              </p>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h3 className="azul mb-3 jersey-25-regular">💻 Tecnologias Utilizadas</h3>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary" style={{ fontWeight: "500" }}>React</span>
                <span className="badge bg-success" style={{ fontWeight: "500" }}>FastAPI</span>
                <span className="badge bg-info" style={{ fontWeight: "500" }}>SQLModel</span>
                <span className="badge bg-warning text-dark" style={{ fontWeight: "500" }}>Bootstrap</span>
                <span className="badge bg-secondary" style={{ fontWeight: "500" }}>Vite</span>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="azul mb-3 jersey-25-regular">👤 Desenvolvedores</h3>
              <p>
                <span style={{ fontWeight: "600" }}>Guilherme Sampaio</span>
                <br />
                <p className="jersey-25-regular">
                  Desenvolvedor apaixonado por tecnologia e compartilhamento de
                  conhecimento.
                </p>
              </p>
              <p>
                <span style={{ fontWeight: "600" }}>Pedro Mota</span>
                <br />
                <p className="jersey-25-regular">
                  Desenvolvedor Front-end.
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
