import { BrowserRouter, Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RateStar from "./components/RateStar";
import Register from "./components/Register";
import LoginForm from "./components/Login";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import { UserProvider } from './components/UserContext';
import "./styles/Header.css";

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/footer" element={<Footer />} />
        <Route path="/rateStar" element={<RateStar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />

        <Route path="/contact_us" element={<ContactUs />} />

        <Route path="/header" element={<Header />} />
      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
