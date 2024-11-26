import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardProps from "../types/Interface";
import CelebCard from "../components/CelebCard";
import Celebs from "../types/Interface";

import "../styles/SearchResult.css";

const SearchResult: React.FC = () => {
  const location = useLocation();
  const [allMovies, setAllMovies] = useState<CardProps[]>([]);
  const [allCelebs, setAllCelebs] = useState<Celebs[]>([]);
  const [searchResultsMovie, setSearchResultsMovie] = useState<CardProps[]>([]);
  const [searchResultsCeleb, setSearchResultsCeleb] = useState<Celebs[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("title") || "";
  };

  const fetchMovies = async () => {
    try {
      const movies = await axios.get(`http://localhost:9999/movie`);
      const celeb = await axios.get(`http://localhost:9999/celebs`);
      setAllMovies(movies.data);
      setAllCelebs(celeb.data);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch data: ${(err as Error).message}`);
    }
  };

  const filterMovies = (query: string) => {
    const normalizedQuery = query.toLowerCase();
    const filtered = allMovies.filter((movie) =>
      movie.title?.toLowerCase().includes(normalizedQuery)
    );
    setSearchResultsMovie(filtered);
  };

  const filterCeleb = (query: string) => {
    const normalizedQuery = query.toLowerCase();
    const filtered = allCelebs.filter((movie) =>
      movie.name?.toLowerCase().includes(normalizedQuery)
    );
    setSearchResultsCeleb(filtered);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const query = getQuery();
    if (query) {
      filterMovies(query);
      filterCeleb(query);
    } else {
      setSearchResultsMovie([]);
      setSearchResultsCeleb([]);
    }
  }, [location.search, allMovies]);

  return (
    <div className="search-page">
      <div className="movie-container">
        <Header />
        <br />
        <div className="road-to-watchlist">
          <h2>Search Result </h2>
        </div>
        <div className="result-search">
          <div className="result-title">
            <h3 className="result-h2">Movies Result</h3>
          </div>
          <div className="movies-grid">
            {searchResultsMovie.length > 0 ? (
              searchResultsMovie.map((film, index) => (
                <div className="movie-card" key={film.id}>
                  <Card
                    id={film.id}
                    image={film.thumbnail}
                    rating={film.vote_average.toFixed(1)}
                    name={`${index + 1}. ${film.title}`}
                    title={""}
                    extract={""}
                    thumbnail={""}
                    banner={""}
                    vote_average={0}
                    trailer={""}
                    popularity={0}
                    vote_count={0}
                    user_rating={film.user_rating}
                    known_for_department={""}
                    original_name={""}
                    profile_path={""}
                    biography={""}
                    birthday={null}
                    place_of_birth={null}
                    genres={[]}
                    description={""}
                    date={""}
                    genders={""}
                    known_for={[]}
                  />
                </div>
              ))
            ) : (
              <p className="no-result-search">No results found</p>
            )}
          </div>
          <div className="result-title">
            <h3 className="result-h2">Celebrities Result</h3>
          </div>
          <div className="actor-search">
            {searchResultsCeleb.length > 0 ? (
              searchResultsCeleb.map((ce) => (
                <div className="movie-card" key={ce.id}>
                  <CelebCard {...ce} />
                </div>
              ))
            ) : (
              <p className="no-result-search">No results found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
