import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../routes/constants";

export default function GoogleCallbackPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const finishGoogleAuth = async () => {
      const query = new URLSearchParams(window.location.search);
      const accessToken = query.get("access_token");
      const refreshToken = query.get("refresh_token");
      const authError = query.get("error");

      if (authError) {
        setError(authError);
        return;
      }

      if (!accessToken) {
        setError("Token de acesso não recebido no callback.");
        return;
      }

      try {
        authService.setToken(accessToken);
        if (refreshToken) {
          authService.setRefreshToken(refreshToken);
        }

        await refreshUser();
        navigate(ROUTES.HOME, { replace: true });
      } catch (e) {
        console.error("Erro ao finalizar login com Google:", e);
        setError("Não foi possível concluir o login com Google.");
      }
    };

    finishGoogleAuth();
  }, [navigate, refreshUser]);

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 text-center">
      <div className="spinner-border azul" role="status">
        <span className="visually-hidden">Autenticando...</span>
      </div>
      <p className="mt-3 text-muted">Concluindo login com Google...</p>
    </div>
  );
}
