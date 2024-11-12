import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CardProps from "../types/Interface";
import "../styles/watchlist.css"; // Import the new CSS file
import axios from "axios";
import Header from "../components/Header";

const PopularMovie: React.FC = () => {
  const [cardFilm, setCardFilm] = useState<CardProps[]>([]);
  const [watchlist, setWatchlist] = useState<number[]>([]);

  const getWatchlist = (): void => {
    axios
      .get(`http://localhost:9999/watchlist`)
      .then((res) => {
        const watchlistMovieIds = res.data.map((item: { movieId: number }) => item.movieId);
        setWatchlist(watchlistMovieIds);
      })
      .catch((error) => {
        console.error("Error fetching watchlist:", error);
      });
  };

  const getMoviesFromWatchlist = (): void => {
    const promises = watchlist.map((id) =>
      axios.get(`http://localhost:9999/movie/${id}`)
    );

    Promise.all(promises)
      .then((responses) => {
        const movies = responses.map((res) => res.data);
        setCardFilm(movies);
      })
      .catch((error) => {
        console.error("Error fetching watchlist movies:", error);
      });
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  useEffect(() => {
    if (watchlist.length > 0) {
      getMoviesFromWatchlist();
    }
  }, [watchlist]);

  return (
    <div className="movie-container">
        <Header/>
        <br></br>
      <a className="road-to-detail" href="/">
        <h2>Watchlist Movies</h2>
      </a>
      <div className="movies-grid">
        {cardFilm.map((film) => (
          <div className="movie-card" key={film.id}>
            <Card
              id={film.id}
              image={film.thumbnail}
              rating={film.vote_average}
              name={film.title} title={""} extract={""} thumbnail={""} banner={""} vote_average={0} trailer={""}            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovie;
