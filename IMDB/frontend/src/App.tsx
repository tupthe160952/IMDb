import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import RateStar from "./components/RateStar";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />} />
        <Route path="/rateStar" element={<RateStar />} />
          
      </Routes>
    </BrowserRouter>
  )
}

export default App
