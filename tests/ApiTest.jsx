import React, { useState } from "react";
import apiService from "../services/api/bridge";

export default function ApiTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testHealthCheck = async () => {
    setLoading(true);
    try {
      const response = await apiService.healthCheck();
      setResult({ success: true, data: response });
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testGetPosts = async () => {
    setLoading(true);
    try {
      const response = await apiService.getPosts();
      setResult({ success: true, data: response });
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5>Teste de API</h5>
        </div>
        <div className="card-body">
          <div className="d-flex gap-2 mb-3">
            <button
              className="btn btn-primary"
              onClick={testHealthCheck}
              disabled={loading}
            >
              {loading ? "Testando..." : "Testar Health Check"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={testGetPosts}
              disabled={loading}
            >
              {loading ? "Testando..." : "Testar GET Posts"}
            </button>
          </div>

          {result && (
            <div
              className={`alert ${
                result.success ? "alert-success" : "alert-danger"
              }`}
            >
              {result.success ? (
                <div>
                  <strong>✅ Sucesso!</strong>
                  <pre className="mt-2">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <strong>❌ Erro:</strong> {result.error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
