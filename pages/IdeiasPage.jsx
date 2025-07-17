import React from "react";

export default function IdeiasPage() {
  return (
    <div className="container jersey-25-regular my-4">
      <div className="text-center mb-4">
        <h1 className="azul">💡 Ideias</h1>
        <p className="text-muted">
          Compartilhe suas ideias de projetos e encontre inspiração
        </p>
      </div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="azul mb-3">Sugira uma ideia de projeto</h5>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Título da sua ideia"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Descreva sua ideia de projeto..."
                  ></textarea>
                </div>
                <div className="mb-3">
                  <select className="form-select">
                    <option value="">Selecione uma categoria</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="react">React</option>
                    <option value="nodejs">Node.js</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Compartilhar Ideia
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
