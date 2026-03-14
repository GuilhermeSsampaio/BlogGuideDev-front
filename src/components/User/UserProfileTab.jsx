import React from "react";

export default function UserProfileTab({
  formData,
  isEditing,
  setIsEditing,
  handleInputChange,
  handleSaveProfile,
}) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="azul mb-0">Sobre mim</h5>
        {!isEditing && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setIsEditing(true)}
          >
            <i className="bi bi-pencil me-1"></i>
            Editar
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSaveProfile}>
          <div className="mb-3">
            <label className="form-label">Biografia</label>
            <textarea
              className="form-control"
              rows="4"
              name="biografia"
              value={formData.biografia}
              onChange={handleInputChange}
              placeholder="Conte um pouco sobre você..."
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary btn-sm">
              <i className="bi bi-check me-1"></i>
              Salvar
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <p className="text-muted mb-4">{formData.biografia}</p>
      )}

      <h6 className="azul mb-2">Links</h6>
      <div>
        {formData.github && (
          <p className="mb-1">
            <i className="bi bi-github me-2"></i>
            <a
              href={formData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="azul text-decoration-none"
            >
              {formData.github.replace("https://", "")}
            </a>
          </p>
        )}
        {formData.linkedin && (
          <p className="mb-0">
            <i className="bi bi-linkedin me-2"></i>
            <a
              href={formData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="azul text-decoration-none"
            >
              {formData.linkedin.replace("https://", "")}
            </a>
          </p>
        )}
        {!formData.github && !formData.linkedin && (
          <p className="text-muted">Nenhum link adicionado.</p>
        )}
      </div>
    </div>
  );
}
