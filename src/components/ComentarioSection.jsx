import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/api/bridge";
import { useAuth } from "../hooks/useAuth";

export default function ComentarioSection({ tipoReferencia, referenciaId }) {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [respostaAbertaId, setRespostaAbertaId] = useState(null);
  const [textoResposta, setTextoResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [replySubmitting, setReplySubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchComentarios();
  }, [referenciaId]);

  const fetchComentarios = async () => {
    try {
      setLoading(true);
      const data = await apiService.getComentarios(
        tipoReferencia,
        referenciaId,
      );
      setComentarios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar comentários:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!novoComentario.trim()) return;

    setSubmitting(true);
    try {
      const comentario = await apiService.createComentario(
        tipoReferencia,
        referenciaId,
        novoComentario,
      );
      setComentarios((prev) => [...prev, comentario]);
      setNovoComentario("");
    } catch (err) {
      console.error("Erro ao criar comentário:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (comentarioId) => {
    try {
      await apiService.deleteComentario(comentarioId);
      setComentarios((prev) =>
        prev
          .filter((c) => c.id !== comentarioId)
          .map((c) => ({
            ...c,
            respostas: (c.respostas || []).filter((r) => r.id !== comentarioId),
          }))
      );
    } catch (err) {
      console.error("Erro ao deletar comentário:", err);
    }
  };

  const handleSubmitResposta = async (e, comentarioId) => {
    e.preventDefault();
    if (!textoResposta.trim()) return;

    setReplySubmitting(true);
    try {
      const resposta = await apiService.createResposta(comentarioId, textoResposta);
      setComentarios((prev) =>
        prev.map((c) =>
          c.id === comentarioId
            ? { ...c, respostas: [...(c.respostas || []), resposta] }
            : c
        )
      );
      setTextoResposta("");
      setRespostaAbertaId(null);
    } catch (err) {
      console.error("Erro ao criar resposta:", err);
    } finally {
      setReplySubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    // Backend stores in UTC; ensure JS parses it as UTC
    let normalized = dateString;
    if (!dateString.endsWith("Z") && !dateString.includes("+")) {
      normalized = dateString + "Z";
    }
    return new Date(normalized).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-4">
      <h5 className="azul mb-3">
        <i className="bi bi-chat-dots me-2"></i>
        Comentários ({comentarios.length})
      </h5>

      {/* Formulário de novo comentário */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="d-flex gap-2">
            <textarea
              className="form-control"
              rows="2"
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Escreva um comentário..."
              required
            ></textarea>
            <button
              type="submit"
              className="btn btn-primary align-self-end"
              disabled={submitting || !novoComentario.trim()}
            >
              {submitting ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <i className="bi bi-send"></i>
              )}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-muted mb-3" style={{ fontSize: "1rem", fontWeight: "bold" }}>
          <i className="bi bi-lock me-1"></i>
          <Link to="/login" className="text-decoration-none">
            Faça login
          </Link>{" "}
          para comentar.
        </p>
      )}

      {/* Lista de comentários */}
      {loading ? (
        <div className="text-center py-3">
          <div
            className="spinner-border spinner-border-sm azul"
            role="status"
          ></div>
        </div>
      ) : comentarios.length === 0 ? (
        <p className="text-muted">Nenhum comentário ainda. Seja o primeiro!</p>
      ) : (
        <div className="list-group list-group-flush">
          {comentarios.map((c) => (
            <div key={c.id} className="list-group-item px-0 py-3 border-bottom">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="comment-header">
                    <div className="comment-header-user">
                      <i className="bi bi-person-circle azul"></i>
                      <strong className="azul small">
                        {c.autor?.username || "Anônimo"}
                      </strong>
                    </div>
                    <span className="comment-header-sep">·</span>
                    <small className="text-muted">{formatDate(c.data)}</small>
                  </div>
                  <p className="mb-0">{c.conteudo}</p>
                  <div className="mt-2 d-flex align-items-center gap-3">
                    {isAuthenticated && (
                      <button
                        className="btn btn-sm btn-link p-0 text-decoration-none"
                        onClick={() => {
                          const isCurrent = respostaAbertaId === c.id;
                          setRespostaAbertaId(isCurrent ? null : c.id);
                          if (!isCurrent) setTextoResposta("");
                        }}
                      >
                        Responder
                      </button>
                    )}
                    {!!c.respostas?.length && (
                      <small className="text-muted">{c.respostas.length} resposta(s)</small>
                    )}
                  </div>

                  {respostaAbertaId === c.id && (
                    <form className="mt-2" onSubmit={(e) => handleSubmitResposta(e, c.id)}>
                      <div className="d-flex gap-2">
                        <textarea
                          className="form-control form-control-sm"
                          rows="2"
                          value={textoResposta}
                          onChange={(e) => setTextoResposta(e.target.value)}
                          placeholder="Escreva sua resposta..."
                          required
                        ></textarea>
                        <button
                          type="submit"
                          className="btn btn-sm btn-primary align-self-end"
                          disabled={replySubmitting || !textoResposta.trim()}
                        >
                          {replySubmitting ? "..." : "Enviar"}
                        </button>
                      </div>
                    </form>
                  )}

                  {!!c.respostas?.length && (
                    <div className="mt-3 ps-3 border-start">
                      {c.respostas.map((r) => (
                        <div key={r.id} className="mb-3">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <div className="comment-header">
                                <div className="comment-header-user">
                                  <i className="bi bi-reply-fill text-muted"></i>
                                  <strong className="small azul">{r.autor?.username || "Anônimo"}</strong>
                                </div>
                                <span className="comment-header-sep">-</span>
                                <small className="text-muted">{formatDate(r.data)}</small>
                              </div>
                              <p className="mb-0 small">{r.conteudo}</p>
                            </div>
                            {isAuthenticated && user?.username === r.autor?.username && (
                              <button
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={() => handleDelete(r.id)}
                                title="Excluir resposta"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {isAuthenticated && user?.username === c.autor?.username && (
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => handleDelete(c.id)}
                    title="Excluir comentário"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
