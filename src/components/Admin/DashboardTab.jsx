import React from "react";

function StatsCard({ icon, label, value, color }) {
  return (
    <div className="col-sm-6 col-lg-4 col-xl-3">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body d-flex align-items-center gap-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: 48,
              height: 48,
              background: color,
              color: "#fff",
              fontSize: "1.3rem",
            }}
          >
            <i className={`bi ${icon}`}></i>
          </div>
          <div>
            <div className="text-muted small">{label}</div>
            <div className="fw-bold fs-4">{value}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardTab({ stats, loading }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border azul" role="status"></div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="row g-3">
      <StatsCard
        icon="bi-people"
        label="Usuários"
        value={stats.total_users}
        color="#6c2bd7"
      />
      <StatsCard
        icon="bi-file-earmark-text"
        label="Posts"
        value={stats.total_posts}
        color="#0d6efd"
      />
      <StatsCard
        icon="bi-check-circle"
        label="Publicados"
        value={stats.published_posts}
        color="#198754"
      />
      <StatsCard
        icon="bi-pencil-square"
        label="Rascunhos"
        value={stats.draft_posts}
        color="#ffc107"
      />
      <StatsCard
        icon="bi-chat-square-text"
        label="Tópicos Fórum"
        value={stats.total_topics}
        color="#0dcaf0"
      />
      <StatsCard
        icon="bi-chat-dots"
        label="Comentários"
        value={stats.total_comentarios}
        color="#6f42c1"
      />
      <StatsCard
        icon="bi-heart"
        label="Curtidas"
        value={stats.total_curtidas}
        color="#dc3545"
      />
    </div>
  );
}
