import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { publicRoutes, protectedRoutes } from "./routes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}

      {/* Rotas protegidas */}
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute>
              <route.component />
            </ProtectedRoute>
          }
        />
      ))}

      {/* Rota 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
