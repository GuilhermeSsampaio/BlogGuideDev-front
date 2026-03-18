import React, { useState } from "react";

export default function PostForm({ onSubmit, initialData = null, onCancel }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    image_url: initialData?.image_url || "",
    categoryLabel: initialData?.categoryLabel || "",
    categoryColor: initialData?.categoryColor || "#6c2bd7",
    icon: initialData?.icon || "",
    description: initialData?.description || "",
    is_published: initialData?.published ?? initialData?.is_published ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { label: "Frontend e Interface", color: "#4fc3f7" },
    { label: "Linguagens e Plataformas", color: "#b2f2bb" },
    { label: "Banco de Dados e CMS", color: "#ffd54f" },
    { label: "Inteligência Artificial", color: "#ffb3c6" },
    { label: "Mobile", color: "#e1bee7" },
    { label: "DevOps e Cloud", color: "#ffe082" },
    { label: "Sistemas Operacionais", color: "#b3c6ff" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCategoryChange = (label, color) => {
    setFormData((prev) => ({
      ...prev,
      categoryLabel: label,
      categoryColor: color,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório";
    }

    if (!formData.excerpt) {
      newErrors.excerpt = "Categoria é obrigatória";
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

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image_url: "",
      categoryLabel: "",
      categoryColor: "#6c2bd7",
      icon: "",
      description: "",
      is_published: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt || null,
        image_url: formData.image_url || null,
        categoryLabel: formData.categoryLabel || null,
        categoryColor: formData.categoryColor || null,
        icon: formData.icon || null,
        description: formData.description || null,
        published: formData.is_published,
      };

      await onSubmit(postData);

      if (!initialData) {
        resetForm();
      }
    } catch (error) {
      console.error("Erro ao salvar post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container jersey-25-regular my-5">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="card border-1 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h4 className="azul mb-0 text-center">
                {initialData ? "Editar Post" : "Criar Novo Post"}
              </h4>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Título <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
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

                <div className="mb-3">
                  <label className="form-label">
                    Categoria <span className="text-danger">*</span>
                  </label>
                  <div
                    className="d-flex flex-wrap gap-2 mb-2"
                    style={{
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "6px",
                    }}
                  >
                    {categoryOptions.map((cat) => (
                      <button
                        key={cat.label}
                        type="button"
                        onClick={() =>
                          handleCategoryChange(cat.label, cat.color)
                        }
                        className={`btn btn-sm border-2 ${
                          formData.categoryLabel === cat.label
                            ? "btn-primary"
                            : "btn-outline-secondary"
                        }`}
                        style={
                          formData.categoryLabel === cat.label
                            ? {
                                backgroundColor: cat.color,
                                borderColor: cat.color,
                              }
                            : {}
                        }
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                  {errors.excerpt && (
                    <div
                      className="text-danger"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {errors.excerpt}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Resumo da Categoria</label>
                  <input
                    type="text"
                    className="form-control"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Ex: Frontend e Interface"
                  />
                  <small className="text-muted">
                    Este campo fica salvo como <code>categoryLabel</code> na
                    API.
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Descrição Breve</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Uma breve descrição do seu post"
                    maxLength={200}
                  />
                  <small className="text-muted">
                    {formData.description.length}/200 caracteres
                  </small>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      URL da Imagem (opcional)
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      URL do Ícone (opcional)
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      name="icon"
                      value={formData.icon}
                      onChange={handleChange}
                      placeholder="https://exemplo.com/icon.svg"
                    />
                  </div>
                </div>

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

                <div className="mb-3">
                  <label className="form-label">
                    Conteúdo <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${errors.content ? "is-invalid" : ""}`}
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="12"
                    placeholder="Escreva o conteúdo do seu post aqui..."
                  ></textarea>
                  {errors.content && (
                    <div className="invalid-feedback">{errors.content}</div>
                  )}
                  <small className="text-muted">
                    {formData.content.length} caracteres (mínimo 50)
                  </small>
                </div>

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
                      ? "Seu post será visível na página pública de conteúdos."
                      : "Seu post será salvo como rascunho no painel do admin."}
                  </small>
                </div>

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
