import React from "react";

export default function UserTabNavigation({ activeTab, setActiveTab, forunsCount }) {
  return (
    <div className="card-header bg-white border-bottom">
      <ul className="nav nav-tabs card-header-tabs border-0">
        <li className="nav-item">
          <button
            className={`nav-link border-1 ${
              activeTab === "perfil" ? "active azul fw-bold" : "text-muted"
            }`}
            onClick={() => setActiveTab("perfil")}
          >
            <i className="bi bi-person me-1"></i>
            <span style={{fontSize: "1rem"}}>Perfil</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link border-1 ${
              activeTab === "foruns" ? "active azul fw-bold" : "text-muted"
            }`}
            onClick={() => setActiveTab("foruns")}
          >
            <i className="bi bi-chat-square-text me-1"></i>
            <span style={{fontSize: "0.9rem"}}>Meus Fóruns ({forunsCount})</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link border-1 ${
              activeTab === "configuracoes"
                ? "active azul fw-bold"
                : "text-muted"
            }`}
            onClick={() => setActiveTab("configuracoes")}
          >
            <i className="bi bi-gear me-1"></i>
            <span style={{fontSize: "0.9rem"}}>Configurações</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
