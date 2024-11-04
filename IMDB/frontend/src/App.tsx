import { BrowserRouter, Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Footer from "./components/Footer";
import RateStar from "./components/RateStar";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />} />
        <Route path="/rateStar" element={<RateStar />} />
        <Route path="/card" element={<Card />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
