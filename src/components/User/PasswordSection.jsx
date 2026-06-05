import React, { useState } from "react";
import authService from "../../services/auth";
import { useToast } from "../../hooks/useToast";

const MIN_PASSWORD_LENGTH = 6;

export default function PasswordSection({ showWarning }) {
  const { showSuccess, showError } = useToast();

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [saving, setSaving] = useState(false);

  const toggleVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // Validações locais
  const passwordsMismatch =
    passwords.confirm.length > 0 && passwords.new !== passwords.confirm;

  const sameAsCurrent =
    passwords.new.length > 0 &&
    passwords.current.length > 0 &&
    passwords.new === passwords.current;

  const tooShort =
    passwords.new.length > 0 && passwords.new.length < MIN_PASSWORD_LENGTH;

  const canSubmit =
    passwords.current.length > 0 &&
    passwords.new.length >= MIN_PASSWORD_LENGTH &&
    passwords.confirm.length > 0 &&
    !passwordsMismatch &&
    !sameAsCurrent &&
    !saving;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setSaving(true);
    try {
      await authService.changePassword(passwords.current, passwords.new);
      showSuccess("Senha alterada com sucesso!");
      setPasswords({ current: "", new: "", confirm: "" });
      setShowPasswords({ current: false, new: false, confirm: false });
    } catch (err) {
      showError(err.message || "Erro ao alterar senha.");
    } finally {
      setSaving(false);
    }
  };

  const renderPasswordInput = (label, name, placeholder) => (
    <div className="mb-3">
      <label className="form-label fw-bold">{label}</label>
      <div className="input-group">
        <input
          type={showPasswords[name] ? "text" : "password"}
          className="form-control"
          name={name}
          value={passwords[name]}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => toggleVisibility(name)}
          tabIndex={-1}
          style={{ borderColor: "#dee2e6" }}
        >
          <i className={`bi ${showPasswords[name] ? "bi-eye-slash" : "bi-eye"}`}></i>
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {renderPasswordInput("Senha Atual", "current", "Digite sua senha atual")}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          {renderPasswordInput("Nova Senha", "new", "Mínimo 6 caracteres")}

          {tooShort && (
            <small className="text-danger d-block mt-n2 mb-2">
              <i className="bi bi-exclamation-circle me-1"></i>
              A senha deve ter no mínimo {MIN_PASSWORD_LENGTH} caracteres.
            </small>
          )}

          {sameAsCurrent && !tooShort && (
            <small className="text-danger d-block mt-n2 mb-2">
              <i className="bi bi-exclamation-circle me-1"></i>
              A nova senha não pode ser igual à senha atual.
            </small>
          )}
        </div>

        <div className="col-md-6">
          {renderPasswordInput("Confirmar Nova Senha", "confirm", "Repita a nova senha")}

          {passwordsMismatch && (
            <small className="text-danger d-block mt-n2 mb-2">
              <i className="bi bi-exclamation-circle me-1"></i>
              As senhas não coincidem.
            </small>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-start mt-2">
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canSubmit}
          onClick={handleSubmit}
          style={{ backgroundColor: "#7C3AED", borderColor: "#7C3AED" }}
        >
          {saving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Alterando...
            </>
          ) : (
            <>
              <i className="bi bi-shield-check me-1"></i>
              Atualizar Senha
            </>
          )}
        </button>
      </div>
    </div>
  );
}
