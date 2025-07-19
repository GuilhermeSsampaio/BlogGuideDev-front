import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function PostForm({ onSubmit, initialData = null, onCancel }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "",
    content: initialData?.content || "",
    image_url: initialData?.image_url || "",
    tags: initialData?.tags || [],
    is_published: initialData?.is_published ?? true,
  });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Backend",
    "Frontend",
    "DevOps",
    "Mobile",
    "Tutorial",
    "Dicas",
    "Projeto",
    "Outro",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Limpar erro quando usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório";
    }

    if (!formData.category) {
      newErrors.category = "Categoria é obrigatória";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Conteúdo é obrigatório";
    }

    if (formData.content.trim().length < 50) {
      newErrors.content = "Conteúdo deve ter pelo menos 50 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const postData = {
        ...formData,
        author_id: user.id,
      };

      await onSubmit(postData);

      // Limpar formulário após sucesso (se não for edição)
      if (!initialData) {
        setFormData({
          title: "",
          category: "",
          content: "",
          image_url: "",
          tags: [],
          is_published: true,
        });
      }
    } catch (error) {
      console.error("Erro ao salvar post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container jersey-25-regular my-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h4 className="azul mb-0">
                {initialData ? "Editar Post" : "Criar Novo Post"}
              </h4>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Título */}
                <div className="mb-3">
                  <label className="form-label">
                    Título <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Digite o título do seu post..."
                    maxLength={200}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                  <small className="text-muted">
                    {formData.title.length}/200 caracteres
                  </small>
                </div>

                {/* Categoria */}
                <div className="mb-3">
                  <label className="form-label">
                    Categoria <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      errors.category ? "is-invalid" : ""
                    }`}
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="invalid-feedback">{errors.category}</div>
                  )}
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <label className="form-label">Tags</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Digite uma tag..."
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddTag(e);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={handleAddTag}
                    >
                      Adicionar
                    </button>
                  </div>

                  {/* Tags adicionadas */}
                  <div className="d-flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-primary d-flex align-items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          style={{ fontSize: "0.6rem" }}
                          onClick={() => handleRemoveTag(tag)}
                          aria-label="Remover tag"
                        ></button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* URL da Imagem */}
                <div className="mb-3">
                  <label className="form-label">URL da Imagem (opcional)</label>
                  <input
                    type="url"
                    className="form-control"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  <small className="text-muted">
                    Cole a URL de uma imagem para ilustrar seu post
                  </small>
                </div>

                {/* Preview da imagem */}
                {formData.image_url && (
                  <div className="mb-3">
                    <label className="form-label">Preview da Imagem</label>
                    <div
                      className="border rounded"
                      style={{
                        height: "200px",
                        backgroundImage: `url('${formData.image_url}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                )}

                {/* Conteúdo */}
                <div className="mb-3">
                  <label className="form-label">
                    Conteúdo <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${
                      errors.content ? "is-invalid" : ""
                    }`}
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="10"
                    placeholder="Escreva o conteúdo do seu post aqui..."
                  ></textarea>
                  {errors.content && (
                    <div className="invalid-feedback">{errors.content}</div>
                  )}
                  <small className="text-muted">
                    {formData.content.length} caracteres (mínimo 50)
                  </small>
                </div>

                {/* Opções de publicação */}
                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_published"
                      id="is_published"
                      checked={formData.is_published}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="is_published">
                      Publicar imediatamente
                    </label>
                  </div>
                  <small className="text-muted">
                    {formData.is_published
                      ? "Seu post será visível para todos"
                      : "Seu post será salvo como rascunho"}
                  </small>
                </div>

                {/* Botões */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {initialData ? "Salvando..." : "Publicando..."}
                      </>
                    ) : initialData ? (
                      "Salvar Alterações"
                    ) : (
                      "Publicar Post"
                    )}
                  </button>

                  {onCancel && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={onCancel}
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
