import React from "react";
import { useToast } from "../hooks/useToast";
import { showToast, systemMessages } from "../utils/toastConfig";

const ToastTestButtons = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const buttonStyle = {
    margin: "5px",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  };

  const successButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745",
    color: "white",
  };

  const errorButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
    color: "white",
  };

  const warningButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ffc107",
    color: "black",
  };

  const infoButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#17a2b8",
    color: "white",
  };

  const containerStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "white",
    border: "2px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  const titleStyle = {
    margin: "0 0 10px 0",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <h4 style={titleStyle}>🧪 Test Toasts</h4>

      <div>
        <button
          style={successButtonStyle}
          onClick={() => showSuccess("✅ Toast de sucesso!")}
        >
          Sucesso
        </button>

        <button
          style={errorButtonStyle}
          onClick={() => showError("❌ Toast de erro!")}
        >
          Erro
        </button>
      </div>

      <div>
        <button
          style={warningButtonStyle}
          onClick={() => showWarning("⚠️ Toast de aviso!")}
        >
          Aviso
        </button>

        <button
          style={infoButtonStyle}
          onClick={() => showInfo("ℹ️ Toast de informação!")}
        >
          Info
        </button>
      </div>

      <div>
        <button
          style={successButtonStyle}
          onClick={() => showToast.success(systemMessages.auth.loginSuccess)}
        >
          Login ✓
        </button>

        <button
          style={errorButtonStyle}
          onClick={() => showToast.error(systemMessages.general.networkError)}
        >
          Rede ✗
        </button>
      </div>

      <div>
        <button
          style={infoButtonStyle}
          onClick={() => showToast.success(systemMessages.posts.createSuccess)}
        >
          Post ✓
        </button>

        <button
          style={warningButtonStyle}
          onClick={() =>
            showToast.custom("🎉 Toast personalizado!", "success", {
              autoClose: 5000,
              position: "bottom-center",
            })
          }
        >
          Custom
        </button>
      </div>
    </div>
  );
};

export default ToastTestButtons;
