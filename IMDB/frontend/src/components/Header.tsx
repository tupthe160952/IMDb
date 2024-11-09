import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Header.css";
import Genre from "../types/Interface";
import { useUser } from './UserContext';

const Header: React.FC = () => {
  const [movieList, setMovieList] = useState<Genre[]>([]);
  const [tvList, setTvList] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [collapseMenu, setCollapseMenu] = useState<boolean>(false);

  const { user, setUser } = useUser(); const handleLogout = () => { localStorage.removeItem('user'); setUser(null); };

  const getList = async () => {
    try {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list`
      );

      if (movieResponse.data.genres) {
        setMovieList(movieResponse.data.genres);
      } else {
        throw new Error("Invalid movie data format");
      }

      const tvResponse = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list`
      );

      if (tvResponse.data.genres) {
        setTvList(tvResponse.data.genres);
      } else {
        throw new Error("Invalid TV data format");
      }

      setError(null);
    } catch (err) {
      setError(`Failed to fetch data: ${(err as Error).message}`);
      console.error(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const toggleMenu = () => {
    setCollapseMenu((prevState) => !prevState);
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

        <div className="search-bar">
          <input
            type="text"
            className="form-search"
            placeholder="Search IMDb"
          />
        </div>

        <div className="watch-list">
          <i className="fa-solid fa-bookmark"></i>
          <a href="/login" className="btn-menu">
            <p>Watchlist</p>
          </a>
        </div>

        <div className="sign-in">
          {/* <a href="/login" className="btn-menu">
            <p>Sign In</p>
          </a> */}
         {user ? ( <select title="User options" value="Profile" onChange={(e) => e.target.value === 'logout' && handleLogout()}> 
         <option value={user.name}>{user.name}</option>
            <option value="logout">Logout</option> </select> ) : ( <a href="/login">Login</a> )}
        </div>
      </div>
      {/* Dropdown menu with collapse effect */}
      <div className={`dropdown ${collapseMenu ? "open" : ""}`}>
        <div className="movie-genre">
          <h3 className="header-title">Movies</h3>
          <ul className="nav-list">
            {movieList.map((genre) => (
              <li key={genre.id}>
                <Link to="/">{genre.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="genre">
          <h3 className="header-title">TV Series</h3>
          <ul className="nav-list">
            {tvList.map((genre) => (
              <li key={genre.id}>
                <Link to="/">{genre.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="close-dropdown" onClick={toggleMenu}>
          <span className="material-symbols-outlined">close</span>
        </div>
      </div>
    </>
  );
};

export default Header;
