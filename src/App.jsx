import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
        <div>
          <Header />
          <hr />

          <Routes>
            <Route path="/" element={<BlogPage />} />
            <Route path="/ideias" element={<IdeiasPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/usuario" element={<UserPage />} />
            <Route path="/criar-post" element={<CriarPostPage />} />
          </Routes>

          <hr />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
