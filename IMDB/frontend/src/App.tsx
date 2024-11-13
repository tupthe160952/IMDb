import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginForm from "./components/Login";
import RateStar from "./components/RateStar";
import Register from "./components/Register";
import { UserProvider } from "./components/UserContext";
import Watchlist from "./components/Watchlist";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import "./styles/Header.css";
import PopularMovieDetail from "./pages/PopularMovieDetail";
import PopularCeleb from "./pages/PopularCeleb";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/footer" element={<Footer />} />
          <Route
            path="/rateStar"
            element={
              <RateStar
                handleRateStar={function (rating: number): void {
                  throw new Error("Function not implemented.");
                }}
                currentRating={null}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/detailpopular" element={<PopularMovieDetail />} />
          <Route path="/contact_us" element={<ContactUs />} />
          <Route path="/popular_person" element={<PopularCeleb />} />

          <Route path="/header" element={<Header />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
