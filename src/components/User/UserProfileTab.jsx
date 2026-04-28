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
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="azul mb-0" style={{ fontSize: "1.2rem", fontWeight: "700" }}>Sobre mim</h5>
      </div>
      {formData.biografia ? (
        <div className="text-muted mb-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => (
                <p style={{ whiteSpace: "pre-line" }} {...props} />
              ),
            }}
          >
            {formData.biografia}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="text-muted mb-4">Nenhuma biografia adicionada.</p>
      )}

      <h6 className="azul mb-2" style={{ fontWeight: "700" }}>Links</h6>
      <div>
        {formData.github && (
          <p className="mb-1">
            <i className="bi bi-github me-2"></i>
            <a
              href={formData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted"
            >
              {formData.github.replace("https://", "")}
            </a>
          </p>
        )}
        {formData.linkedin && (
          <p className="mb-0">
            <i className="bi bi-linkedin me-2"></i>
            <a
              href={formData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted"
            >
              {formData.linkedin.replace("https://", "")}
            </a>
          </p>
        )}
        {!formData.github && !formData.linkedin && (
          <p className="text-muted">Nenhum link adicionado.</p>
        )}
      </div>
    </div>
  );
}
