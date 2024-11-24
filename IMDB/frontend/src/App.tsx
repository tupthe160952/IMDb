import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginForm from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RateStar from "./components/RateStar";
import Register from "./components/Register";
import { UserProvider } from "./components/UserContext";
import AddMovie from "./pages/admin/AddMovie";
import MovieList from "./pages/admin/ListMovie";
import AdminPage from "./pages/AdminPage";
import AllMovieDetail from "./pages/AllMovieDetail";
import CelebDetail from "./pages/CelebDetail";
import ContactUs from "./pages/ContactUs";
import GenreDetailPage from "./pages/GenreDetail";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import PopularCeleb from "./pages/PopularCeleb";
import PopularMovieDetail from "./pages/PopularMovieDetail";
import SearchResult from "./pages/SearchResult";
import UpComingMovieDetail from "./pages/UpComingMovieDetail";
import UserProfile from "./pages/UserProfile";
import Watchlist from "./pages/WatchlistDetail";
import "./styles/Header.css";
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
          <Route path="/genredetail/:id" element={<GenreDetailPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/detailpopular" element={<PopularMovieDetail />} />
          <Route path="/detailupcoming" element={<UpComingMovieDetail />} />
          <Route path="/contact_us" element={<ContactUs />} />
          <Route path="/popular_person" element={<PopularCeleb />} />
          <Route path="/celebs/:id" element={<CelebDetail />} />
          <Route path="/header" element={<Header />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/allmovie" element={<AllMovieDetail />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage /> {/* Chỉ cho phép admin truy cập */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/addMovie"
            element={
              <ProtectedRoute>
                <AddMovie existingMovies={[]} />{" "}
                {/* Chỉ cho phép admin truy cập */}
              </ProtectedRoute>
            } />
            <Route 
            path="/admin/listMovie" 
            element={
              <ProtectedRoute>
                <MovieList /> {/* Chỉ cho phép admin truy cập */}
              </ProtectedRoute>
            } />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
