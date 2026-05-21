import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/api/bridge";

export default function ComunidadePage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await apiService.authRequest("/users/public");
        setProfiles(data);
      } catch (err) {
        console.error("Erro ao carregar perfis públicos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const resolveProfilePicture = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
    return `${baseUrl}${path}`;
  };

  if (loading) {
    return (
      <div className="container my-5 text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ minHeight: "70vh" }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: "#6c2bd7" }}>
          <i className="bi bi-people-fill me-2"></i>Comunidade
        </h2>
        <p className="text-muted">Descubra e conecte-se com os autores da nossa plataforma.</p>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center text-muted p-5 bg-light rounded shadow-sm">
          <i className="bi bi-person-x fs-1 mb-3"></i>
          <h5>Nenhum perfil público encontrado no momento.</h5>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {profiles.map((p) => {
            const avatar = resolveProfilePicture(p.profile_picture);
            return (
              <div className="col" key={p.id}>
                <div
                  className="card h-100 shadow-sm border-0 position-relative"
                  style={{
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                    borderRadius: "1rem",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";
                  }}
                >
                  {/* Decorative background header */}
                  <div style={{ height: "60px", background: "linear-gradient(135deg, #6c2bd7 0%, #9e64ff 100%)" }}></div>
                  
                  <div className="card-body text-center mt-n4 position-relative d-flex flex-column">
                    {/* Avatar Container */}
                    <div className="d-inline-block bg-white p-1 rounded-circle shadow-sm mb-3 align-self-center" style={{ marginTop: "-40px", width: "fit-content" }}>
                      {avatar ? (
                        <img
                          src={avatar}
                          alt={p.username}
                          className="rounded-circle"
                          style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                      ) : (
                        <i className="bi bi-person-circle text-secondary" style={{ fontSize: "5rem", lineHeight: "1" }}></i>
                      )}
                    </div>

                    <h6 className="card-title fw-bold mb-1" style={{ color: "#333" }}>
                      {p.nome_completo || p.username}
                    </h6>
                    <p className="text-muted small mb-3">@{p.username}</p>
                    
                    {p.bio && (
                      <p className="card-text small text-muted text-truncate mx-auto" style={{ maxHeight: "40px", maxWidth: "90%" }}>
                        {p.bio}
                      </p>
                    )}

                    <Link
                      to={`/perfil/${p.username}`}
                      className="btn mt-auto w-100 fw-bold"
                      style={{
                        background: "rgba(108, 43, 215, 0.1)",
                        color: "#6c2bd7",
                        borderRadius: "0.5rem"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#6c2bd7";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(108, 43, 215, 0.1)";
                        e.currentTarget.style.color = "#6c2bd7";
                      }}
                    >
                      Ver Perfil
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
