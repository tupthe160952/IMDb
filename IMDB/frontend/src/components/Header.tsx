import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Header.css";
import GenreDetail from "../types/Interface"; // Giả sử GenreDetail chứa thông tin về phim
import { useUser } from "./UserContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState<GenreDetail[]>([]);
  const [collapseMenu, setCollapseMenu] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allSuggestions, setAllSuggestions] = useState<GenreDetail[]>([]); // Trạng thái cho tất cả gợi ý phim
  const [filteredSuggestions, setFilteredSuggestions] = useState<GenreDetail[]>([]); // Trạng thái cho gợi ý đã lọc
  const { user, setUser } = useUser();

  const handleWatchlistClick = () => {
    if (!user) {
      alert("Please log in to add to your watchlist.");
      window.location.href = "/login";
    } else {
      window.location.href = "/watchlist";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  // Hàm mới để fetch danh sách phim
  const getMoviesList = async () => {
    try {
      const res = await axios.get(`http://localhost:9999/movie`); // Lấy danh sách phim từ API
      setAllSuggestions(res.data); // Cập nhật danh sách phim cho gợi ý
      setFilteredSuggestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getGenresList = async () => {
    try {
      const res = await axios.get(`http://localhost:9999/genres`); // Lấy danh sách thể loại từ API
      setMovieList(res.data); // Cập nhật danh sách thể loại
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMoviesList(); // Fetch danh sách phim
    getGenresList(); // Fetch danh sách thể loại
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSuggestions([]); // Không hiển thị gợi ý nếu ô tìm kiếm rỗng
      return;
    }

    const filtered = allSuggestions.filter(movie =>
      movie.title && movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredSuggestions(filtered);
  }, [searchQuery, allSuggestions]);

  const toggleMenu = () => {
    setCollapseMenu((prevState) => !prevState);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    const normalizedSearchQuery = searchQuery.trim(); // Giữ nguyên tiêu đề tìm kiếm
    navigate(`/search?title=${encodeURIComponent(normalizedSearchQuery)}`);
  };

  const handleSuggestionClick = (title: string) => {
    setSearchQuery(title); // Đặt giá trị ô tìm kiếm thành gợi ý
    setFilteredSuggestions([]); // Xóa gợi ý
  };
  return (
    <>
      <div className="header">
        <div className="logo">
          <a href="/">
            <img
              className="imdb-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              alt="IMDb Logo"
            />
          </a>
        </div>

        <div className="menu" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
          <p>Menu</p>
        </div>

        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="form-search"
            placeholder="Search IMDb"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị ô tìm kiếm
          />
          <button type="submit" className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {filteredSuggestions.length > 0 && (
          <div className="suggestions">
            {filteredSuggestions.map((movie) => (
              <div
                key={movie.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(movie.title)} // Xử lý khi người dùng nhấp vào gợi ý
              >
                {movie.title}
              </div>
            ))}
          </div>
        )}

        <div className="menu">
          <a href="/allmovie" className="btn-menu">
            <i className="fa-solid bi-film"></i>
            <p>Movies</p>
          </a>
        </div>

        <div className="watch-list">
          <i className="fa-solid fa-bookmark"></i>
          <a onClick={handleWatchlistClick} className="btn-menu">
            <p>Watchlist</p>
          </a>
        </div>

        <div className="sign-in">
          {user ? (
            <div className="user-profile">
              <select
                title="User  options"
                defaultValue="" // Đặt giá trị mặc định là rỗng
                onChange={(e) => {
                  if (e.target.value === "profile") {
                    navigate('/profile'); // Chuyển đến trang profile
                  } else if (e.target.value === "dashboard") {
                    navigate('/admin'); // Chuyển đến trang admin
                  } else if (e.target.value === "logout") {
                    handleLogout();
                  }
                }}
              >
                <option value="" disabled>
                  {user.name} {/* Hiển thị tên người dùng */}
                </option>
                {user.role === "admin" && ( // Kiểm tra nếu user là admin
                  <option value="dashboard">AdminPage</option>
                )}
                <option value="profile">Profile</option>
                <option value="logout">Logout</option>
              </select>
            </div>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      </div>
      {/* Dropdown menu with collapse effect */}
      <div className={`dropdown ${collapseMenu ? "open" : ""}`}>
        <div className="movie-genre">
          <h3 className="header-title">Movies Types</h3>
          <ul className="nav-list">
            {Array.isArray(movieList) && movieList.length > 0 ? (
              movieList.map((genre) => (
                <li key={genre.id}>
                  <p
                    className="text-nav"
                    onClick={() => {
                      navigate(`/genredetail/${genre.id}`);
                      window.location.reload();
                    }}
                  >
                    {genre.name}
                  </p>
                </li>
              ))
            ) : (
              <li>No genres available</li>
            )}
          </ul>
        </div>
        <div className="close-dropdown" onClick={toggleMenu}>
          <span
            className="material-symbols-outlined"
            style={{ color: "black" }}
          >
            close
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;