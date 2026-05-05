import React from "react";

export default function UserTabNavigation({ activeTab, setActiveTab, forunsCount }) {
  return (
    <div className="card-header bg-white border-bottom user-tabs">
      <ul className="nav nav-tabs card-header-tabs border-0 user-tabs-list">
        <li className="nav-item">
          <button
            className={`nav-link border-1 user-tab-btn ${
              activeTab === "perfil" ? "active azul fw-bold" : "text-muted"
            }`}
            onClick={() => setActiveTab("perfil")}
          >
            <i className="bi bi-person user-tab-icon"></i>
            <span className="user-tab-label">Perfil</span>
            <span className="user-tab-count user-tab-count--placeholder">(0)</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link border-1 user-tab-btn ${
              activeTab === "foruns" ? "active azul fw-bold" : "text-muted"
            }`}
            onClick={() => setActiveTab("foruns")}
          >
            <i className="bi bi-chat-square-text user-tab-icon"></i>
            <span className="user-tab-label">Meus Fóruns</span>
            <span className="user-tab-count">({forunsCount})</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link border-1 user-tab-btn ${
              activeTab === "configuracoes"
                ? "active azul fw-bold"
                : "text-muted"
            }`}
            onClick={() => setActiveTab("configuracoes")}
          >
            <i className="bi bi-gear user-tab-icon"></i>
            <span className="user-tab-label">Configurações</span>
            <span className="user-tab-count user-tab-count--placeholder">(0)</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
