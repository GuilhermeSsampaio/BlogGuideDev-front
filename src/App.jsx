import "./App.css";
import CtaBox from "./components/CtaBox";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PostCard from "./components/PostCard";
function App() {
  return (
    <div>
      <div>
        <Header />
        <hr></hr>
        <CtaBox />
        <hr></hr>
        <PostCard />
        <hr></hr>
        <Footer />
      </div>
    </div>
  );
}

export default App;
