import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api/bridge";
import { useAuth } from "../../hooks/useAuth";

export default function NotificationBell() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const visibleItems = useMemo(() => items.slice(0, 8), [items]);

  const loadNotificacoes = async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const data = await apiService.getNotificacoes();
      setItems(Array.isArray(data?.items) ? data.items : []);
      setUnreadCount(data?.unread_count || 0);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotificacoes();
    if (!isAuthenticated) return;

    const timer = setInterval(loadNotificacoes, 30000);
    return () => clearInterval(timer);
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  const resolveTarget = (item) => {
    if (item.tipo_referencia === "forum") {
      return `/forum/${item.referencia_id}`;
    }
    if (item.tipo_referencia === "post" || item.tipo_referencia === "conteudo") {
      return `/conteudo/${item.referencia_id}`;
    }
    return "/usuario";
  };

  const handleClickItem = async (item) => {
    try {
      if (!item.lida) {
        await apiService.markNotificacaoRead(item.id);
        setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, lida: true } : n)));
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }

    setOpen(false);
    navigate(resolveTarget(item));
  };

  return (
    <div className="position-relative me-2">
      <button
        className="btn btn-light border rounded-circle"
        style={{ width: "42px", height: "42px" }}
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) loadNotificacoes();
        }}
        aria-label="Notificações"
      >
        <i className="bi bi-bell"></i>
      </button>

      {unreadCount > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{ fontSize: "0.65rem" }}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      {open && (
        <div
          className="notification-dropdown bg-white border rounded shadow"
          style={{
            position: window.innerWidth < 768 ? "fixed" : "absolute",
            ...(window.innerWidth < 768
              ? { top: "70px", left: "0.75rem", right: "0.75rem", width: "auto" }
              : { right: 0, width: "330px" }),
            maxHeight: "420px",
            overflowY: "auto",
            zIndex: 1200,
            marginTop: window.innerWidth >= 768 ? "0.5rem" : 0,
          }}
        >
          <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
            <strong>Notificações</strong>
            <small className="text-muted">{unreadCount} novas</small>
          </div>

          {loading ? (
            <div className="p-3 text-center text-muted small">Carregando...</div>
          ) : visibleItems.length === 0 ? (
            <div className="p-3 text-muted small">Sem notificações por enquanto.</div>
          ) : (
            visibleItems.map((item) => (
              <button
                key={item.id}
                className={`w-100 text-start border-0 bg-transparent px-3 py-2 ${item.lida ? "" : "notification-unread"}`}
                onClick={() => handleClickItem(item)}
              >
                <div className="small" style={{ color: "#222" }}>{item.mensagem}</div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  {new Date(item.data_criacao).toLocaleString("pt-BR")}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
