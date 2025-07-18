import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <hr />

          <main className="main-content">
            <AppRoutes />
          </main>

          <hr />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
