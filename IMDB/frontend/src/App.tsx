import { BrowserRouter, Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RateStar from "./components/RateStar";
import "./styles/Header.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />} />
        <Route path="/rateStar" element={<RateStar />} />
        <Route path="/card" element={<Card />}/>
        <Route path="/header" element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
