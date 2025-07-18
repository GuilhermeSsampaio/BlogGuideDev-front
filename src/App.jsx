import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogPage from "./pages/BlogPage";
import IdeiasPage from "./pages/IdeiasPage";
import SobrePage from "./pages/SobrePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import CriarPostPage from "./pages/CriarPostPage";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <hr />

          <main className="main-content">
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<BlogPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Rotas protegidas */}
              <Route
                path="/ideias"
                element={
                  <ProtectedRoute>
                    <IdeiasPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sobre"
                element={
                  <ProtectedRoute>
                    <SobrePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/usuario"
                element={
                  <ProtectedRoute>
                    <UserPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/criar-post"
                element={
                  <ProtectedRoute>
                    <CriarPostPage />
                  </ProtectedRoute>
                }
              />

              {/* Rota 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <hr />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
