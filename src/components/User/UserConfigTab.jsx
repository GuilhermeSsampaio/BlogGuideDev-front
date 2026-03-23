import React, { useState } from "react";

export default function UserConfigTab({
  formData,
  handleInputChange,
  handleSaveProfile,
  showWarning,
  logout,
}) {

  const [saveStatus, setSaveStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaveStatus("saving");

    try {
      await handleSaveProfile(e);

      setSaveStatus("success");

      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);

    } catch (error) {
      console.error(error);
      setSaveStatus("idle");
    }
  };

  return (
    <div>
      <h5 className="azul mb-3">Configurações da Conta</h5>

      <form onSubmit={handleSubmit}>
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
                className="form-control text-muted"
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
                className="form-control text-muted"
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
            <div className="form-check form-switch mb-3">
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

          <div className="col-md-6">
            <div className="form-check form-switch mb-3">
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

        {/* BOTÕES */}

        <div className="d-flex justify-content-end gap-2 mt-4">

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

          <button
            type="submit"
            className="btn btn-primary"
            disabled={saveStatus === "saving"}
          >
            {saveStatus === "saving" && (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Salvando...
              </>
            )}

            {saveStatus === "success" && (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Salvo com sucesso
              </>
            )}

            {saveStatus === "idle" && (
              <>
                <i className="bi bi-check me-1"></i>
                Salvar Alterações
              </>
            )}
          </button>

        </div>

        <hr className="my-4" />

        <div>
          <h6 className="text-danger mb-3">Sessão</h6>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Sair da conta
          </button>
        </div>

      </form>
    </div>
  );
}