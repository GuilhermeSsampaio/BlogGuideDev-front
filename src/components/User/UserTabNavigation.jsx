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
            Perfil
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
            Meus Fóruns ({forunsCount})
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
            Configurações
          </button>
        </li>
      </ul>
    </div>
  );
}
