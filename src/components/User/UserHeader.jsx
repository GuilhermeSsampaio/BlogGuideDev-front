import React, { useRef } from "react";

export default function UserHeader({
  formData,
  user,
  userStats,
  avatarPreview,
  onAvatarFileSelected,
}) {
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onAvatarFileSelected(file);
    }
  };

  return (
    <div className="card border-0 shadow-sm mb-4 user-profile-card">
      {/* Gradient Banner */}
      <div className="user-profile-banner" />

      <div className="card-body px-4 pb-4 pt-0">
        {/* Avatar overlapping the banner */}
        <div className="d-flex align-items-start gap-3 mb-3">
          <div className="user-profile-avatar-ring position-relative flex-shrink-0">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar do usuario"
              />
            ) : (
              <div className="avatar-placeholder">
                <i
                  className="bi bi-person-fill text-muted"
                  style={{ fontSize: "2.2rem" }}
                ></i>
              </div>
            )}
            <button
              className="btn btn-sm btn-light position-absolute rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: "28px", height: "28px", bottom: "2px", right: "2px", border: "2px solid #fff" }}
              title="Alterar foto"
              onClick={handleAvatarClick}
            >
              <i className="bi bi-camera" style={{ fontSize: "0.75rem" }}></i>
            </button>
            {/* Input invisivel para selecionar a imagem local */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="d-none"
              onChange={handleAvatarChange}
              aria-label="Selecionar foto de perfil"
            />
          </div>
          <div className="flex-grow-1" style={{ paddingTop: "8px" }}>
            <h3 className="mb-0 fw-bold" style={{ color: "#222" }}>{formData.nome}</h3>
            <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
              @{user?.username || "usuario"}
              <span className="mx-2">·</span>
              <span
                className="badge rounded-pill"
                style={{
                  background: user?.tipo_perfil === "admin" ? "#dc3545" : "linear-gradient(135deg, #7C3AED, #333ceb)",
                  color: "#fff",
                  fontSize: "0.72rem",
                  fontWeight: "600",
                  padding: "3px 10px",
                }}
              >
                {user?.tipo_perfil === "recrutador" ? "Recrutador" : user?.tipo_perfil === "admin" ? "Admin" : "Estudante"}
              </span>
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mt-1">
          <div className="col-12 col-sm-4">
            <div className="border-1 user-profile-stat-card">
              <h5 className="azul mb-0">{userStats.curtidas}</h5>
              <small className="text-muted">Curtidas</small>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="user-profile-stat-card">
              <h5 className="azul mb-0">{userStats.comentarios}</h5>
              <small className="text-muted">Comentários</small>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="user-profile-stat-card">
              <h5 className="azul mb-0">{userStats.foruns}</h5>
              <small className="text-muted">Fóruns</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
