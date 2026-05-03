import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function UserProfileTab({
  formData,
  isEditing,
  setIsEditing,
  handleInputChange,
  handleSaveProfile,
}) {
  return (
    <div className="p-2">
      {/* Sobre Mim */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <i className="bi bi-person-vcard azul" style={{ fontSize: "1.15rem" }}></i>
          <h5 className="mb-0 fw-bold" style={{ fontSize: "1.15rem", color: "#222" }}>Sobre mim</h5>
        </div>
        {formData.biografia ? (
          <div
            className="p-3 rounded"
            style={{
              background: "#f8f9fa",
              borderLeft: "3px solid #7C3AED",
              fontSize: "0.98rem",
              lineHeight: "1.7",
              color: "#444",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => (
                  <p style={{ whiteSpace: "pre-line", marginBottom: "0.5rem" }} {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    style={{ color: "#7C3AED", textDecoration: "underline" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
              }}
            >
              {formData.biografia}
            </ReactMarkdown>
          </div>
        ) : (
          <div
            className="p-3 rounded text-center"
            style={{ background: "#f8f9fa", color: "#999" }}
          >
            <i className="bi bi-pencil-square me-2"></i>
            Nenhuma biografia adicionada. Vá em <strong>Configurações</strong> para editar.
          </div>
        )}
      </div>

      {/* Links Sociais */}
      <div>
        <div className="d-flex align-items-center gap-2 mb-3">
          <i className="bi bi-link-45deg azul" style={{ fontSize: "1.15rem" }}></i>
          <h5 className="mb-0 fw-bold" style={{ fontSize: "1.15rem", color: "#222" }}>Links</h5>
        </div>
        <div className="d-flex flex-column gap-2">
          {formData.github && (
            <a
              href={formData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-2 p-2 rounded text-decoration-none"
              style={{
                background: "#f8f9fa",
                color: "#333",
                transition: "all 0.2s",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#7C3AED";
                e.currentTarget.style.background = "#faf5ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.background = "#f8f9fa";
              }}
            >
              <i className="bi bi-github" style={{ fontSize: "1.2rem", color: "#333" }}></i>
              <span style={{ fontSize: "0.95rem" }}>{formData.github.replace("https://", "")}</span>
            </a>
          )}
          {formData.linkedin && (
            <a
              href={formData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-2 p-2 rounded text-decoration-none"
              style={{
                background: "#f8f9fa",
                color: "#333",
                transition: "all 0.2s",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#0a66c2";
                e.currentTarget.style.background = "#f0f7ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.background = "#f8f9fa";
              }}
            >
              <i className="bi bi-linkedin" style={{ fontSize: "1.2rem", color: "#0a66c2" }}></i>
              <span style={{ fontSize: "0.95rem" }}>{formData.linkedin.replace("https://", "")}</span>
            </a>
          )}
          {!formData.github && !formData.linkedin && (
            <div
              className="p-3 rounded text-center"
              style={{ background: "#f8f9fa", color: "#999" }}
            >
              <i className="bi bi-link me-2"></i>
              Nenhum link adicionado. Vá em <strong>Configurações</strong> para editar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
