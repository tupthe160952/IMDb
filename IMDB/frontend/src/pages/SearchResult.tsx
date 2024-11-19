import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CardProps } from "react-bootstrap";
import "../styles/SearchResult.css";

const SearchResult: React.FC = () => {
  const location = useLocation();
  const [allMovies, setAllMovies] = useState<CardProps[]>([]);
  const [searchResults, setSearchResults] = useState<CardProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("title") || "";
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/movie`);
      setAllMovies(response.data);
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
    setSearchResults(filtered);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const query = getQuery();
    if (query) {
      filterMovies(query);
    } else {
      setSearchResults([]);
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
        <div className="movies-grid">
          {searchResults.length > 0 ? (
            searchResults.map((film, index) => (
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
                />
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResult;
