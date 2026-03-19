import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function CriarForumPage() {
  const { createTopic } = useForum();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    tipo: "",
    imagem_url: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [imagemMode, setImagemMode] = useState("url"); // "url" ou "file"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescricaoChange = (value) => {
    setFormData((prev) => ({ ...prev, descricao: value || "", }));
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
    if (!formData.titulo.trim() || !plainText) return;

    setSubmitting(true);
    try {
      const dataToSend = {
        ...formData,
        imagem_url: formData.imagem_url || null,
      };
      await createTopic(dataToSend);
      showSuccess("Tópico criado com sucesso!");
      navigate("/forum");
    } catch (err) {
      showError("Erro ao criar tópico. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {/* Header */}
          <div className="mb-4">
            <Link
              to="/forum"
              className="btn mb-4" style={{ backgroundColor: "#7C3AED", color: "#ffffff", fontWeight: "500" }}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Voltar ao Fórum
            </Link>
            <h2 className="text-title-forum fw-bold">Criar Novo Tópico</h2>
          </div>

          {/* Alerta de diretrizes */}
          <div
            className="alert d-flex align-items-start gap-3 mb-4"
            style={{
              backgroundColor: "#fff8e1",
              border: "1px solid #ffe082",
              borderRadius: "8px",
            }}
          >
            <i
              className="bi bi-exclamation-triangle-fill"
              style={{ color: "#f9a825", fontSize: "1.4rem", marginTop: "2px" }}
            ></i>
            <div>
              <strong>Antes de publicar, leia nossas diretrizes!</strong>
              <p className="mb-0 mt-1" style={{ fontSize: "0.9rem" }}>
                Para manter a qualidade do fórum, pedimos que leia nosso{" "}
                <Link
                  to="/diretrizes-forum"
                  style={{ color: "#333ceb", fontWeight: "bold" }}
                >
                  guia de diretrizes
                </Link>{" "}
                antes de criar seu tópico.
              </p>
            </div>
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
                      className={`btn btn-sm ${
                        imagemMode === "url"
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
                      className={`btn btn-sm ${
                        imagemMode === "file"
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
                        Selecione uma imagem do seu computador (JPG, PNG, GIF)
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

                {/* Botões */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? "Criando..." : "Criar Tópico"}
                  </button>
                  <Link to="/forum" className="btn btn-outline-danger">
                    Cancelar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
