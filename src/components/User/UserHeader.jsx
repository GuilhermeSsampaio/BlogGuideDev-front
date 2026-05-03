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
    <div className="card border-0 shadow-sm mb-4 jersey-25-regular">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="rounded-circle bg-primary d-flex align-items-center justify-content-center position-relative"
            style={{ width: "80px", height: "80px" }}
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar do usuario"
                className="rounded-circle"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            ) : (
              <i
                className="bi bi-person-fill text-white"
                style={{ fontSize: "2rem" }}
              ></i>
            )}
            <button
              className="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle p-1 d-flex align-items-center justify-content-center"
              style={{ width: "24px", height: "24px" }}
              title="Alterar foto"
              onClick={handleAvatarClick}
            >
              <i className="bi bi-camera" style={{ fontSize: "0.7rem" }}></i>
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
          <div className="flex-grow-1">
            <h3 className="azul mb-0">{formData.nome}</h3>
            <p className="text-muted mb-1">@{user?.username || "usuario"}</p>
            <small className="text-muted">
              {user?.tipo_perfil === "recrutador" ? "Recrutador" : "Estudante"}
            </small>
          </div>
        </div>

        <div className="row text-center user-profile-stats">
          <div className="col-4">
            <h5 className="azul mb-0">{userStats.curtidas}</h5>
            <small className="text-muted">Curtidas</small>
          </div>
          <div className="col-4">
            <h5 className="azul mb-0">{userStats.comentarios}</h5>
            <small className="text-muted">Comentários</small>
          </div>
          <div className="col-4">
            <h5 className="azul mb-0">{userStats.foruns}</h5>
            <small className="text-muted">Fóruns</small>
          </div>
        </div>
      </div>
    </div>
  );
}
