import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForum } from "../hooks/useForum";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

export default function IdeiasPage() {
  const { topics, loading, error, fetchTopics, createTopic, deleteTopic } =
    useForum();
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    tipo: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const tiposTopico = [
    "Dúvida",
    "Discussão",
    "Ideia de Projeto",
    "Tutorial",
    "Ajuda",
    "Outro",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.descricao.trim()) return;

    setSubmitting(true);
    try {
      await createTopic(formData);
      showSuccess("Tópico criado com sucesso!");
      setFormData({ titulo: "", descricao: "", tipo: "" });
      setShowForm(false);
    } catch (err) {
      showError("Erro ao criar tópico. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (topicId) => {
    if (!window.confirm("Tem certeza que deseja excluir este tópico?")) return;
    try {
      await deleteTopic(topicId);
      showSuccess("Tópico excluído com sucesso!");
    } catch (err) {
      showError("Erro ao excluir tópico.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border azul mt-5" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3 text-muted">Carregando fórum...</p>
      </div>
    );
  }

  return (
    <div className="container jersey-25-regular my-5">
      <div className="text-center mb-4">
        <h1 className="azul">💬 Fórum</h1>
        <p className="text-muted">
          Compartilhe ideias, tire dúvidas e discuta com a comunidade
        </p>
      </div>

      {/* Botão de novo tópico */}
      {isAuthenticated && (
        <div className="text-end mb-3">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-circle"} me-1`}></i>
            {showForm ? "Cancelar" : "Novo Tópico"}
          </button>
        </div>
      )}

      {/* Formulário de criação */}
      {showForm && (
        <div className="row mb-4">
          <div className="col-md-8 mx-auto">
            <div className="card border-1 shadow-sm">
              <div className="card-body p-4">
                <h5 className="azul mb-3">Criar Novo Tópico</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      placeholder="Título do tópico"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                    >
                      <option value="">Selecione um tipo (opcional)</option>
                      {tiposTopico.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Descreva seu tópico..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? "Criando..." : "Criar Tópico"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de tópicos */}
      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {topics.length === 0 ? (
        <div className="text-center py-5">
          <i
            className="bi bi-chat-square-text text-muted"
            style={{ fontSize: "3rem" }}
          ></i>
          <h3 className="azul mt-3">Nenhum tópico ainda</h3>
          <p className="text-muted">Seja o primeiro a criar um tópico!</p>
        </div>
      ) : (
        <div className="list-group">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="list-group-item list-group-item-action border-1 mb-2 rounded shadow-sm"
            >
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <Link
                    to={`/forum/${topic.id}`}
                    className="text-decoration-none"
                  >
                    <h5 className="azul mb-1">{topic.titulo}</h5>
                  </Link>
                  {topic.tipo && (
                    <span className="badge bg-info text-dark me-2">
                      {topic.tipo}
                    </span>
                  )}
                  <p className="text-muted mb-2">
                    {topic.descricao.length > 150
                      ? topic.descricao.substring(0, 150) + "..."
                      : topic.descricao}
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <small className="text-muted">
                      <i className="bi bi-person-circle me-1"></i>
                      {topic.autor?.username || "Anônimo"}
                    </small>
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      {formatDate(topic.data_criacao)}
                    </small>
                  </div>
                </div>
                {isAuthenticated && user?.username === topic.autor?.username && (
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => handleDelete(topic.id)}
                    title="Excluir tópico"
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
