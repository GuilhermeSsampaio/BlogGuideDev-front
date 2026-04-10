import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthProvider";
import ToastTestButtons from "./components/ToastTestButtons";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container d-flex flex-column min-vh-100">
          <Header />
          <main className="main-content flex-grow-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>

        {/* Botões de teste dos toasts - remover em produção */}
        {/* <ToastTestButtons /> */}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
