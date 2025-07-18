import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function CtaBox() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container jersey-25-regular my-4">
        <div className="card border-0 shadow-sm bg-primary text-white">
          <div className="card-body text-center py-4">
            <h3 className="mb-3">Compartilhe seu conhecimento!</h3>
            <p className="mb-3" style={{ fontSize: "1.1rem" }}>
              Idéias? Projetos? Tutoriais? Vamos aprender juntos!
            </p>
            <div className="d-flex gap-2 justify-content-center">
              <Link to="/login" className="btn btn-light btn-lg">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Entrar
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-lg">
                <i className="bi bi-person-plus me-2"></i>
                Criar Conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container jersey-25-regular my-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center py-4">
          <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
            <div
              className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
              style={{ width: "50px", height: "50px" }}
            >
              <i
                className="bi bi-person-fill text-white"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </div>
            <div className="text-start">
              <h5 className="mb-0 azul">Olá, {user?.name}!</h5>
              <small className="text-muted">
                O que você quer compartilhar hoje?
              </small>
            </div>
          </div>

          <div className="d-flex gap-2 justify-content-center flex-wrap">
            <Link to="/criar-post" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>
              Criar Post
            </Link>
            <Link to="/ideias" className="btn btn-outline-primary">
              <i className="bi bi-lightbulb me-2"></i>
              Compartilhar Ideia
            </Link>
            <Link to="/usuario" className="btn btn-outline-secondary">
              <i className="bi bi-person-circle me-2"></i>
              Meu Perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
