import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import RateStar from "./components/RateStar";
import Register from './components/Register';
import LoginForm from './components/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />} />
        <Route path="/rateStar" element={<RateStar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
          
      </Routes>
    </BrowserRouter>
  )
}

export default App
