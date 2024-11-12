import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CardProps from "../types/Interface";
import "../styles/watchlist.css"; // Import the new CSS file
import axios from "axios";
import Header from "../components/Header";

const Watchlist: React.FC = () => {
  const [cardFilm, setCardFilm] = useState<CardProps[]>([]);
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("alphabet");

  const getWatchlist = (): void => {
    axios
      .get(`http://localhost:9999/watchlist`)
      .then((res) => {
        const watchlistMovieIds = res.data.map(
          (item: { movieId: number }) => item.movieId
        );
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
        setCardFilm(sortMovies(movies, sortCriteria));
      })
      .catch((error) => {
        console.error("Error fetching watchlist movies:", error);
      });
  };

  const sortMovies = (movies: CardProps[], criteria: string): CardProps[] => {
    switch (criteria) {
      case "alphabet":
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case "voteCount":
        return [...movies].sort((a, b) => b.vote_count - a.vote_count);
      case "voteAverage":
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      case "popularity":
        return [...movies].sort((a, b) => b.popularity - a.popularity);
      default:
        return movies;
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = event.target.value;
    setSortCriteria(criteria);
    setCardFilm(sortMovies(cardFilm, criteria));
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
      <Header />
      <br></br>
      <div className="road-to-detail">
        <h2>Your Watchlist</h2>
      </div>
      <div className="control-panel">
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="alphabet">Alphabetical</option>
          <option value="voteCount">Number of ratings</option>
          <option value="voteAverage">IMDB rating</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      <div className="total-movies">
        {" "}
        <p>Total Movies: {cardFilm.length}</p>{" "}
      </div>
      <div className="movies-grid">
        {cardFilm.map((film, index) => (
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
              popularity={undefined}
              vote_count={undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
