import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginForm from "./components/Login";
import RateStar from "./components/RateStar";
import Register from "./components/Register";
import { UserProvider } from "./components/UserContext";
import Watchlist from "./pages/WatchlistDetail";
import CelebDetail from "./pages/CelebDetail";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import PopularCeleb from "./pages/PopularCeleb";
import PopularMovieDetail from "./pages/PopularMovieDetail";
import UpComingMovieDetail from "./pages/UpComingMovieDetail";
import GenreDetailPage from "./pages/GenreDetail";
import SearchResult from "./pages/SearchResult";
import "./styles/Header.css";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/UserProfile";
import AdminPage from "./pages/AdminPage";
import AddMovie from "./pages/admin/AddMovie";
import MovieList from "./pages/admin/ListMovie";
import AllMovieDetail from "./pages/AllMovieDetail";
import ListCeleb from "./pages/admin/ListCeleb";
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
            path="/addMovie"
            element={
              <ProtectedRoute>
                <AddMovie existingMovies={[]} />{" "}
                {/* Chỉ cho phép admin truy cập */}
              </ProtectedRoute>
            } />
            <Route 
            path="/listMovie" 
            element={
              <ProtectedRoute>
                <MovieList /> {/* Chỉ cho phép admin truy cập */}
              </ProtectedRoute>
            } />
            <Route 
            path="/listCeleb" 
            element={
              <ProtectedRoute>
                <ListCeleb /> {/* Chỉ cho phép admin truy cập */}
              </ProtectedRoute>
            } />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
