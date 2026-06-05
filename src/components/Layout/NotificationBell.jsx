import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api/bridge";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

let globalLastUnreadCount = -1;
let lastToastTime = 0;

export default function NotificationBell() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { showInfo } = useToast();

  const visibleItems = useMemo(() => items.slice(0, 8), [items]);

  const loadNotificacoes = async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const data = await apiService.getNotificacoes();
      const newItems = Array.isArray(data?.items) ? data.items : [];
      const newUnread = data?.unread_count || 0;
      
      setItems(newItems);
      setUnreadCount(newUnread);

      const now = Date.now();
      if (
        globalLastUnreadCount !== -1 && 
        newUnread > globalLastUnreadCount && 
        newItems.length > 0 &&
        (now - lastToastTime > 1000) // Prevent double toast from the other instance
      ) {
        const newest = newItems[0];
        if (!newest.lida) {
          showInfo(`Nova notificação: ${newest.mensagem}`);
          lastToastTime = now;
        }
      }
      
      // Update global tracker only if it went up, or if we reset it to 0
      if (newUnread > globalLastUnreadCount || newUnread === 0) {
        globalLastUnreadCount = newUnread;
      }
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

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

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
    <div className="position-relative me-2" ref={dropdownRef}>
      <button
        className="btn btn-light border rounded-circle"
        style={{ width: "42px", height: "42px" }}
        onClick={async () => {
          const next = !open;
          setOpen(next);
          if (next && isAuthenticated) {
            await loadNotificacoes();
            if (unreadCount > 0) {
              try {
                await apiService.markAllNotificacoesRead();
                setUnreadCount(0);
                setItems((prev) => prev.map((n) => ({ ...n, lida: true })));
                globalLastUnreadCount = 0;
              } catch (error) {
                console.error("Erro ao marcar todas como lidas", error);
              }
            }
          }
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
          {!isAuthenticated ? (
            <>
              <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
                <small style={{ fontWeight: "500" }}>Notificações</small>
              </div>
              <div className="p-4 text-center">
                <p className="text-muted small mb-3">
                  Faça login ou cadastre-se para ver suas notificações e interagir com a comunidade.
                </p>
                <div className="d-flex flex-column gap-2">
                  <button 
                    className="btn btn-primary btn-sm w-100" 
                    style={{ backgroundColor: "#7C3AED", borderColor: "#7C3AED" }}
                    onClick={() => { setOpen(false); navigate("/login"); }}
                  >
                    Fazer Login
                  </button>
                  <button 
                    className="btn btn-outline-primary btn-sm w-100" 
                    style={{ color: "#7C3AED", borderColor: "#7C3AED" }}
                    onClick={() => { setOpen(false); navigate("/register"); }}
                  >
                    Cadastrar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
                <small style={{ fontWeight: "500" }}>Notificações</small>
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
                    className={`w-100 text-start px-3 py-3 border-0 border-bottom notification-item ${item.lida ? "" : "notification-unread"}`}
                    style={{ borderColor: "#f0f0f0", transition: "background-color 0.2s ease" }}
                    onClick={() => handleClickItem(item)}
                  >
                    <div className="small" style={{ color: "#222", marginBottom: "0.2rem" }}>{item.mensagem}</div>
                    <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                      {new Date(item.data_criacao).toLocaleString("pt-BR")}
                    </div>
                  </button>
                ))
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
