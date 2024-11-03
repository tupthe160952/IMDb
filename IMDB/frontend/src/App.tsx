import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import RateStar from "./components/RateStar";
import Header from "./components/Header";
import "./styles/Header.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />} />
        <Route path="/rateStar" element={<RateStar />} />
        <Route path="/header" element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
