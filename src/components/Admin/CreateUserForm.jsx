import React, { useState } from "react";

export default function CreateUserForm({ onCreate }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    tipo_perfil: "user",
    cnpj: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      // Monta o payload — inclui cnpj apenas para recrutador
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
        tipo_perfil: form.tipo_perfil,
      };
      if (form.tipo_perfil === "recrutador") {
        payload.cnpj = form.cnpj;
      }
      await onCreate(payload);
      setForm({ username: "", email: "", password: "", tipo_perfil: "user", cnpj: "" });
    } catch (err) {
      setError(err.message || "Erro ao criar usuário");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h6 className="azul mb-3">
          <i className="bi bi-person-plus me-2"></i>Criar Novo Usuário
        </h6>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="password"
                className="form-control form-control-sm"
                placeholder="Senha"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-sm"
                value={form.tipo_perfil}
                onChange={(e) =>
                  setForm({ ...form, tipo_perfil: e.target.value })
                }
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="recrutador">recrutador</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                type="submit"
                className="btn btn-primary btn-sm w-100"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <>
                    <i className="bi bi-plus-lg me-1"></i>Criar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Campo CNPJ — visível apenas para recrutador */}
          {form.tipo_perfil === "recrutador" && (
            <div className="row g-2 mt-2">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="CNPJ (obrigatório para recrutador)"
                  value={form.cnpj}
                  onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-8">
                <small className="text-muted d-block mt-1">
                  <i className="bi bi-info-circle me-1"></i>
                  O CNPJ será validado. A empresa precisa estar com situação ATIVA.
                </small>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
