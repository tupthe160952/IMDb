import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Genre from "../types/Interface";
import "../styles/PopularMovieDetail.css";
import "../styles/Pagination.css";
import CardProps from "../types/Interface";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUser } from "./UserContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AllMovieList: React.FC = () => {
  const { user } = useUser();
  const [originalMovies, setOriginalMovies] = useState<CardProps[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<CardProps[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [ratings, setRatings] = useState<{ movieId: number; rating: number }[]>(
    []
  );
  const [sortCriteria, setSortCriteria] = useState<string>("alphabet");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [moviesPerPage] = useState<number>(15); // 15 movies per page

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
    setCurrentPage(1); // Reset to the first page
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
    setCurrentPage(1); // Reset to the first page
  };

  // Fetch initial data
  useEffect(() => {
    fetchMovies();
    fetchGenres();
    fetchRatings();
  }, []);

  // Pagination calculations
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <div>
      <Header />
      <div className="outside">
        <div className="popular-page">
          <div className="description-popular">
            <h2>IMDb Charts</h2>
            <p className="motto">All Movies</p>
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
                <select
                  value={selectedGenre || ""}
                  onChange={handleGenreChange}
                >
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
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {currentMovies.map((film) => (
                <div className="col" key={film.id}>
                  <Card
                    id={film.id}
                    image={film.thumbnail}
                    rating={film.vote_average}
                    name={film.title}
                    genres={film.genres.map(
                      (genreId) =>
                        genres.find((genre) => genre.id === genreId)?.name || ""
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4 mx-2 mb-4">
            <Pagination>
              <Pagination.Prev
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  currentPage < totalPages && setCurrentPage(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AllMovieList;
