import React from "react";

export default function UserConfigTab({
  formData,
  handleInputChange,
  handleSaveProfile,
  showWarning,
}) {
  return (
    <div>
      <h5 className="azul mb-3">Configurações da Conta</h5>

      <form onSubmit={handleSaveProfile}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Nome completo</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Biografia</label>
          <textarea
            className="form-control"
            rows="3"
            name="biografia"
            value={formData.biografia}
            onChange={handleInputChange}
            placeholder="Conte um pouco sobre você..."
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-github me-1"></i>
                GitHub
              </label>
              <input
                type="url"
                className="form-control"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="https://github.com/seuusuario"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-linkedin me-1"></i>
                LinkedIn
              </label>
              <input
                type="url"
                className="form-control"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/seuusuario"
              />
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <h6 className="azul mb-3">Preferências</h6>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="notificacaoEmail"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="notificacaoEmail">
                  Receber notificações por email
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="perfilPublico"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="perfilPublico">
                  Perfil público
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-check me-1"></i>
            Salvar Alterações
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() =>
              showWarning("Funcionalidade de exclusão em desenvolvimento")
            }
          >
            <i className="bi bi-trash me-1"></i>
            Excluir Conta
          </button>
        </div>
      </form>
    </div>
  );
}
