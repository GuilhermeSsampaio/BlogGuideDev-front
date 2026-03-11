import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import apiService from "../services/api/bridge";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState({ posts: [], forum: [], vagas: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      doSearch(query);
    }
  }, [query]);

  const doSearch = async (q) => {
    setLoading(true);
    try {
      const data = await apiService.search(q);
      setResults(data);
    } catch (err) {
      console.error("Erro na pesquisa:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const totalResults =
    results.posts.length + results.forum.length + results.vagas.length;

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <h2 className="azul jersey-25-regular mb-1">
        <i className="bi bi-search me-2"></i>Resultados da Pesquisa
      </h2>
      <p className="text-muted mb-4">
        {loading
          ? "Buscando..."
          : `${totalResults} resultado${totalResults !== 1 ? "s" : ""} para "${query}"`}
      </p>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border azul" role="status"></div>
        </div>
      ) : totalResults === 0 ? (
        <div className="text-center py-5">
          <i
            className="bi bi-search text-muted"
            style={{ fontSize: "3rem" }}
          ></i>
          <p className="text-muted mt-3">Nenhum resultado encontrado.</p>
        </div>
      ) : (
        <>
          {/* Posts */}
          {results.posts.length > 0 && (
            <div className="mb-4">
              <h5 className="azul mb-3">
                <i className="bi bi-file-earmark-text me-2"></i>
                Posts ({results.posts.length})
              </h5>
              <div className="list-group">
                {results.posts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/conteudo/${p.id}`}
                    className="list-group-item list-group-item-action border-0 shadow-sm mb-2 rounded"
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="mb-1 azul">{p.title}</h6>
                        {p.excerpt && (
                          <small className="text-muted d-block mb-1">
                            {p.excerpt}
                          </small>
                        )}
                        <small className="text-muted">
                          <i className="bi bi-person me-1"></i>
                          {p.author} · {formatDate(p.created_at)}
                        </small>
                      </div>
                      {p.image_url && (
                        <img
                          src={p.image_url}
                          alt=""
                          className="rounded ms-3"
                          style={{ width: 60, height: 60, objectFit: "cover" }}
                        />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Fórum */}
          {results.forum.length > 0 && (
            <div className="mb-4">
              <h5 className="azul mb-3">
                <i className="bi bi-chat-square-text me-2"></i>
                Fórum ({results.forum.length})
              </h5>
              <div className="list-group">
                {results.forum.map((t) => (
                  <Link
                    key={t.id}
                    to={`/forum/${t.id}`}
                    className="list-group-item list-group-item-action border-0 shadow-sm mb-2 rounded"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 azul">{t.titulo}</h6>
                        <small className="text-muted">
                          <i className="bi bi-person me-1"></i>
                          {t.autor} · {formatDate(t.data_criacao)}
                        </small>
                      </div>
                      {t.tipo && (
                        <span className="badge bg-info text-dark">
                          {t.tipo}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Vagas */}
          {results.vagas.length > 0 && (
            <div className="mb-4">
              <h5 className="azul mb-3">
                <i className="bi bi-briefcase me-2"></i>
                Vagas ({results.vagas.length})
              </h5>
              <div className="list-group">
                {results.vagas.map((v) => (
                  <Link
                    key={v.id}
                    to={`/vagas/${v.id}`}
                    className="list-group-item list-group-item-action border-0 shadow-sm mb-2 rounded"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 azul">{v.titulo}</h6>
                        <small className="text-muted">
                          <i className="bi bi-building me-1"></i>
                          {v.empresa}
                          {v.localidade && ` · ${v.localidade}`}
                          {" · "}
                          {formatDate(v.data_criacao)}
                        </small>
                      </div>
                      {v.tipo_contrato && (
                        <span className="badge bg-success">
                          {v.tipo_contrato}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
