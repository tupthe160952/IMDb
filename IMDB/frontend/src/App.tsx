import { BrowserRouter, Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RateStar from "./components/RateStar";
import Register from './components/Register';
import LoginForm from './components/Login';
import ContactUs from "./pages/ContactUs";

import "./styles/Header.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />} />
        <Route path="/rateStar" element={<RateStar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
          
        <Route path="/card" element={<Card />} />
        <Route path="/contact_us" element={<ContactUs />} />
        
        <Route path="/header" element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
