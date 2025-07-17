import React from "react";

export default function BtnCriarPost() {
  return (
    <div className="text-center my-4">
      <button
        className="btn btn-lg px-4 py-3 fw-bold text-white border-0 rounded-pill shadow-lg position-relative overflow-hidden"
        style={{
          background:
            "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 4s ease infinite",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px) scale(1.05)";
          e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0) scale(1)";
          e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
        }}
        onClick={() => (window.location.href = "/criar-post")}
      >
        ✨ Criar Novo Post ✨
      </button>
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
