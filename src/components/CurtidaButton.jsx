import React, { useState, useEffect } from "react";
import apiService from "../services/api/bridge";
import { useAuth } from "../hooks/useAuth";

export default function CurtidaButton({ tipoReferencia, referenciaId }) {
  const [curtido, setCurtido] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchCurtidas();
  }, [referenciaId]);

  const fetchCurtidas = async () => {
    try {
      if (isAuthenticated) {
        const data = await apiService.getCurtidasWithUser(tipoReferencia, referenciaId);
        setTotal(data.total);
        setCurtido(data.curtido);
      } else {
        const data = await apiService.getCurtidas(tipoReferencia, referenciaId);
        setTotal(data.total);
      }
    } catch (err) {
      console.error("Erro ao carregar curtidas:", err);
    }
  };

  const handleToggle = async () => {
    if (!isAuthenticated || loading) return;
    setLoading(true);
    try {
      const data = await apiService.toggleCurtida(tipoReferencia, referenciaId);
      setCurtido(data.curtido);
      setTotal(data.total);
    } catch (err) {
      console.error("Erro ao curtir:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`btn btn-sm ${curtido ? "btn-danger" : "btn-outline-danger"} d-inline-flex align-items-center gap-1`}
      onClick={handleToggle}
      disabled={!isAuthenticated || loading}
      title={isAuthenticated ? (curtido ? "Descurtir" : "Curtir") : "Faça login para curtir"}
    >
      <i className={`bi ${curtido ? "bi-heart-fill" : "bi-heart"}`}></i>
      <span>{total}</span>
    </button>
  );
}
