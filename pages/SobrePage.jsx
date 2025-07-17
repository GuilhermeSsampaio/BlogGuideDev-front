import React from "react";

export default function SobrePage() {
  return (
    <div className="container jersey-25-regular my-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="text-center mb-5">
            <h1 className="azul">Sobre o BlogGuide</h1>
            <p className="lead text-muted">
              Uma plataforma para desenvolvedores compartilharem conhecimento
            </p>
          </div>

          <div className="card border-0 shadow-sm mb-4">
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
              <h3 className="azul mb-3">💻 Tecnologias</h3>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary">React</span>
                <span className="badge bg-success">FastAPI</span>
                <span className="badge bg-info">SQLModel</span>
                <span className="badge bg-warning text-dark">Bootstrap</span>
                <span className="badge bg-secondary">Vite</span>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="azul mb-3">👤 Desenvolvedor</h3>
              <p>
                <strong>Guilherme Sampaio</strong>
                <br />
                Desenvolvedor apaixonado por tecnologia e compartilhamento de
                conhecimento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
