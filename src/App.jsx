import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CtaBox from "./components/CtaBox";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PostCard from "./components/PostCard";
import BlogPage from "./pages/BlogPage";
import IdeiasPage from "./pages/IdeiasPage";
import SobrePage from "./pages/SobrePage";
import CriarPostPage from "./pages/CriarPostPage";
import UserPage from "./pages/UserPage";
function App() {
  return (
    <Router>
      <div>
        <Header />
        <hr />

        <Routes>
          <Route path="/" element={<BlogPage />} />
          <Route path="/ideias" element={<IdeiasPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/criar-post" element={<CriarPostPage />} />
          <Route path="/usuario" element={<UserPage />} />
        </Routes>

        <hr />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
