import React from "react";

export default function UserHeader({
  formData,
  mockPosts,
  isEditing,
  setIsEditing,
  showWarning,
}) {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="rounded-circle bg-primary d-flex align-items-center justify-content-center position-relative"
            style={{ width: "80px", height: "80px" }}
          >
            <i
              className="bi bi-person-fill text-white"
              style={{ fontSize: "2rem" }}
            ></i>
            <button
              className="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle p-1"
              style={{ width: "24px", height: "24px" }}
              title="Alterar foto"
              onClick={() => showWarning("Funcionalidade em desenvolvimento")}
            >
              <i className="bi bi-camera" style={{ fontSize: "0.7rem" }}></i>
            </button>
          </div>
          <div className="flex-grow-1">
            <h3 className="azul mb-0">{formData.nome}</h3>
            <p className="text-muted mb-1">@guilherme_dev</p>
            <small className="text-muted">Membro desde Janeiro 2025</small>
          </div>
          <div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <i className="bi bi-pencil me-1"></i>
              {isEditing ? "Cancelar" : "Editar"}
            </button>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-4">
            <h5 className="azul mb-0">{mockPosts.length}</h5>
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
  );
}
