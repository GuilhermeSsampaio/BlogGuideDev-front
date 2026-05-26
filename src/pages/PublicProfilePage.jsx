import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiService from "../services/api/bridge";

export default function PublicProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiService.authRequest(`/users/public/${username}`);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  const resolveProfilePicture = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
    return `${baseUrl}${path}`;
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning text-center" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error || "Perfil não encontrado ou privado."}
        </div>
        <div className="text-center">
          <Link to="/" className="btn btn-primary">Voltar para Home</Link>
        </div>
      </div>
    );
  }

  const avatarUrl = resolveProfilePicture(profile.profile_picture);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            <div
              className="bg-primary bg-gradient"
              style={{ height: "120px" }}
            ></div>
            <div className="card-body text-center position-relative" style={{ marginTop: "-60px" }}>
              <div className="d-inline-block bg-white rounded-circle shadow-sm mb-3" style={{ padding: "4px" }}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={profile.username}
                    className="rounded-circle"
                    style={{ width: "112px", height: "112px", objectFit: "cover" }}
                  />
                ) : (
                  <i className="bi bi-person-circle text-secondary bg-white rounded-circle" style={{ fontSize: "7rem", lineHeight: "1", display: "block" }}></i>
                )}
              </div>
              <h4 className="fw-bold mb-3 azul">{profile.nome_completo || profile.username}</h4>

              {profile.bio && (
                <p className="card-text mb-4 px-3" style={{ fontSize: "1.1rem" }}>
                  "{profile.bio}"
                </p>
              )}

              <div className="d-flex justify-content-center gap-3 mt-4">
                {profile.github && (
                  <a
                    href={profile.github.startsWith("http") ? profile.github : `https://${profile.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark"
                    title="GitHub"
                  >
                    <i className="bi bi-github"></i>
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin.startsWith("http") ? profile.linkedin : `https://${profile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                    title="LinkedIn"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
