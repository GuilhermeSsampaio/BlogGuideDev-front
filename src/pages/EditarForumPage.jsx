import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForum } from "../hooks/useForum";
import { useToast } from "../hooks/useToast";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "code-block", "blockquote"],
  ],
};

const quillFormats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "link",
  "image",
  "code-block",
  "blockquote",
];

const tiposTopico = [
  "Dúvida",
  "Discussão",
  "Ideia de Projeto",
  "Tutorial",
  "Ajuda",
  "Outro",
];

export default function EditarForumPage() {
  const { topicId } = useParams();
  const { fetchTopic, updateTopic } = useForum();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    tipo: "",
    imagem_url: "",
    tags: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [imagemMode, setImagemMode] = useState("url"); // "url" ou "file"
  const [initialLoading, setInitialLoading] = useState(true);
  const [tagInput, setTagInput] = useState("");

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      let newTag = tagInput.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      if (newTag && formData.tags.length < 5 && !formData.tags.includes(newTag)) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  useEffect(() => {
    const loadTopic = async () => {
      setInitialLoading(true);
      try {
        const data = await fetchTopic(topicId);
        if (data) {
          setFormData({
            titulo: data.titulo || "",
            descricao: data.descricao || "",
            tipo: data.tipo || "",
            imagem_url: data.imagem_url || "",
            tags: data.tags || [],
          });
          if (data.imagem_url && data.imagem_url.startsWith("data:")) {
            setImagemMode("file");
          } else if (data.imagem_url) {
            setImagemMode("url");
          }
        }
      } catch (error) {
        showError("Não foi possível carregar o tópico para edição.");
        navigate("/forum");
      } finally {
        setInitialLoading(false);
      }
    };
    loadTopic();
  }, [topicId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescricaoChange = (value) => {
    setFormData((prev) => ({ ...prev, descricao: value || "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, imagem_url: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plainText = formData.descricao.replace(/<[^>]*>/g, "").trim();
    if (!formData.titulo.trim() || !plainText || !formData.tipo.trim()) return;

    setSubmitting(true);
    try {
      const dataToSend = {
        ...formData,
        imagem_url: formData.imagem_url || null,
      };
      await updateTopic(topicId, dataToSend);
      showSuccess("Tópico atualizado com sucesso!");
      navigate(`/forum/${topicId}`);
    } catch (err) {
      showError("Erro ao atualizar tópico. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border azul mt-5" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3 text-muted">Carregando dados do tópico...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5 page-detail-container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {/* Header */}
          <div className="mb-4 button-return">
            <Link
              to={`/forum/${topicId}`}
              className="btn mb-4" style={{ backgroundColor: "#7C3AED", color: "#ffffff", fontWeight: "500" }}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Voltar ao Tópico
            </Link>
            <h2 className="text-title-form fw-bold">Editar Fórum</h2>
          </div>

          {/* Formulário */}
          <div className="card border-1 shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Título */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Título do Tópico</label>
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

                {/* Tipo */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Tipo do Tópico (opcional)
                  </label>
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

                {/* Imagem - Toggle entre URL e Arquivo */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Imagem (opcional)</label>
                  <div className="btn-group w-100 mb-2" role="group">
                    <button
                      type="button"
                      className={`btn btn-sm ${imagemMode === "url"
                          ? "btn-primary"
                          : "btn-outline-primary"
                        }`}
                      onClick={() => {
                        setImagemMode("url");
                        setFormData((prev) => ({ ...prev, imagem_url: "" }));
                      }}
                    >
                      <i className="bi bi-link-45deg me-1"></i>
                      Por Link
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${imagemMode === "file"
                          ? "btn-primary"
                          : "btn-outline-primary"
                        }`}
                      onClick={() => {
                        setImagemMode("file");
                        setFormData((prev) => ({ ...prev, imagem_url: "" }));
                      }}
                    >
                      <i className="bi bi-upload me-1"></i>
                      Do Aparelho
                    </button>
                  </div>

                  {imagemMode === "url" ? (
                    <>
                      <input
                        type="url"
                        className="form-control"
                        name="imagem_url"
                        value={formData.imagem_url || ""}
                        onChange={handleChange}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                      <small className="text-muted">
                        Cole a URL de uma imagem para ilustrar seu tópico
                      </small>
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <small className="text-muted">
                        Selecione uma nova imagem do seu computador (JPG, PNG, GIF)
                      </small>
                    </>
                  )}
                </div>

                {/* Preview da imagem */}
                {formData.imagem_url && (
                  <div className="mb-3">
                    <label className="form-label">Preview da Imagem</label>
                    <div
                      className="border rounded"
                      style={{
                        height: "200px",
                        backgroundImage: `url('${formData.imagem_url}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                )}

                {/* Rich text editor - campo maior */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Conteúdo</label>
                  <ReactQuill
                    theme="snow"
                    value={formData.descricao || ""}
                    onChange={handleDescricaoChange}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Escreva o conteúdo do seu tópico aqui..."
                    style={{ background: "#fff", minHeight: "300px" }}
                  />
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Hashtags (máximo 5)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite e aperte Enter, Espaço ou Vírgula"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    disabled={formData.tags.length >= 5}
                  />
                  {formData.tags.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="badge d-flex align-items-center"
                          style={{ backgroundColor: "#7C3AED", fontSize: "0.9rem", padding: "0.4em 0.6em" }}
                        >
                          #{tag}
                          <i
                            className="bi bi-x ms-2"
                            style={{ cursor: "pointer", fontSize: "1.2rem" }}
                            onClick={() => removeTag(tag)}
                          ></i>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Botões */}
                <div className="forum-create-actions mt-5">
                  <Link to={`/forum/${topicId}`} className="btn btn-outline-danger">
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      submitting ||
                      !formData.titulo.trim() ||
                      !formData.tipo.trim() ||
                      !formData.descricao.replace(/<[^>]*>/g, "").trim()
                    }
                  >
                    {submitting ? (
                      <>
                        <i className="bi bi-check-lg me-1"></i> Salvando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-1"></i> Salvar Alterações
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
