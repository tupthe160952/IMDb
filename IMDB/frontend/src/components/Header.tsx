import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import GenreDetail from "../types/Interface";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState<GenreDetail[]>([]);
  const [collapseMenu, setCollapseMenu] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleWatchlistClick = () => {
    if (!user) {
      alert("Please log in to add to your watchlist.");
      window.location.href = "/login";
    } else {
      window.location.href = "/watchlist";
    }
  };

  const { user, setUser } = useUser();
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };
  const handleProfile = () => {
    window.location.href = "/profile";
  };
  const getList = async () => {
    axios
      .get(`http://localhost:9999/genres`)
      .then((res) => {
        setMovieList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const toggleMenu = () => {
    setCollapseMenu((prevState) => !prevState);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    const normalizedSearchQuery = capitalizeFirstLetter(searchQuery.trim());
    window.location.href = `/search?title=${encodeURIComponent(
      normalizedSearchQuery
    )}`;
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

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
          } else if (e.target.value === "logout") {
            handleLogout();
          }
        }}
      >
        <option value="" disabled>
          {user.name} {/* Hiển thị tên người dùng */}
        </option>
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
