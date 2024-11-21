import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Genre from "../types/Interface";
import "../styles/PopularMovieDetail.css";
import CardProps from "../types/Interface";
import { useUser } from "./UserContext";
import Footer from "../components/Footer";

const PopularMovieList: React.FC = () => {
  const { user } = useUser();
  const [originalMovies, setOriginalMovies] = useState<CardProps[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<CardProps[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [ratings, setRatings] = useState<{ movieId: number; rating: number }[]>(
    []
  );
  const [sortCriteria, setSortCriteria] = useState<string>("alphabet");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  // Fetch genres from API
  const fetchGenres = async (): Promise<void> => {
    try {
      const response = await axios.get<Genre[]>(`http://localhost:9999/genres`);
      setGenres(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Fetch movies from API
  const fetchMovies = async (): Promise<void> => {
    try {
      const response = await axios.get<CardProps[]>(
        `http://localhost:9999/movie`
      );
      setOriginalMovies(response.data);
      setFilteredMovies(response.data); // Initially set filteredMovies to all movies
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Fetch user ratings
  const fetchRatings = async (): Promise<void> => {
    if (user) {
      try {
        const response = await axios.get(`http://localhost:9999/ratings`, {
          params: { userId: user.id },
        });
        const userRatings = response.data.map(
          (item: { ratestar: { movieId: number; rating: number } }) =>
            item.ratestar
        );
        setRatings(userRatings);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    }
  };

  // Sort and filter movies based on criteria and selected genre
  const filterAndSortMovies = (
    movies: CardProps[],
    criteria: string,
    genre: number | null
  ): CardProps[] => {
    let sortedMovies = [...movies];

    // Filter by genre
    if (genre) {
      sortedMovies = sortedMovies.filter((movie) =>
        movie.genres.includes(genre)
      );
    }

    // Sort by criteria
    switch (criteria) {
      case "alphabet":
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "voteCount":
        sortedMovies.sort((a, b) => b.vote_count - a.vote_count);
        break;
      case "voteAverage":
        sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case "popularity":
        sortedMovies.sort((a, b) => b.popularity - a.popularity);
        break;
      case "userRating":
        sortedMovies.sort((a, b) => {
          const ratingA = ratings.find((r) => r.movieId === a.id)?.rating || 0;
          const ratingB = ratings.find((r) => r.movieId === b.id)?.rating || 0;
          return ratingB - ratingA;
        });
        break;
      default:
        break;
    }

    return sortedMovies;
  };

  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = event.target.value;
    setSortCriteria(criteria);
    const updatedMovies = filterAndSortMovies(
      originalMovies,
      criteria,
      selectedGenre
    );
    setFilteredMovies(updatedMovies);
  };

  // Handle genre filter change
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = Number(event.target.value) || null;
    setSelectedGenre(genreId);
    const updatedMovies = filterAndSortMovies(
      originalMovies,
      sortCriteria,
      genreId
    );
    setFilteredMovies(updatedMovies);
  };

  // Fetch initial data
  useEffect(() => {
    fetchMovies();
    fetchGenres();
    fetchRatings();
  }, []);

  return (
    <div className="outside">
      <div className="popular-page">
        <div className="description-popular">
          <h2>IMDb Charts</h2>
          <p className="motto">Most Popular Movies</p>
          <p className="motto-down">As determined by IMDb users</p>
          <div className="filter">
            <p className="tips">{filteredMovies.length} Titles</p>
            <span className="filter-box">
              Sort by:{" "}
              <select value={sortCriteria} onChange={handleSortChange}>
                <option value="alphabet">Alphabetically</option>
                <option value="voteCount">Number of ratings</option>
                <option value="voteAverage">IMDB Rating</option>
                <option value="popularity">Popularity</option>
                <option value="userRating">Your rating</option>
              </select>
              <select value={selectedGenre || ""} onChange={handleGenreChange}>
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>
        <div className="list">
          {filteredMovies.map((film, index) => (
            <Card
              key={film.id}
              id={film.id}
              image={film.thumbnail}
              rating={film.vote_average}
              name={`${index + 1}. ${film.title}`}
              genres={[]} user_rating={0} popularity={0} vote_count={0} description={""} title={""} extract={""} thumbnail={""} banner={""} vote_average={0} trailer={""} known_for_department={""} original_name={""} profile_path={""} biography={""} birthday={null} place_of_birth={null} date={""} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularMovieList;
