import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CardProps from "../types/Interface";
import "../styles/watchlist.css"; 
import axios from "axios";
import Header from "../components/Header";
import { useUser } from "./UserContext"; 

const Watchlist: React.FC = () => {
  const { user } = useUser(); // Lấy thông tin người dùng từ UserContext
  const [cardFilm, setCardFilm] = useState<CardProps[]>([]);
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [ratings, setRatings] = useState<{ movieId: number; rating: number }[]>(
    []
  );
  const [sortCriteria, setSortCriteria] = useState<string>("alphabet");

    
    // Hàm fetch watchlist and ratings
    useEffect(() => {
        if (user) {
            const fetchWatchlistAndRatings = async () => {
                try {
                    const [watchlistRes, ratingsRes] = await Promise.all([
                        axios.get(`http://localhost:9999/watchlist`, { params: { userId: user.id } }),
                        axios.get(`http://localhost:9999/ratings`, { params: { userId: user.id } })
                    ]);
                    const watchlistMovieIds = watchlistRes.data.map((item: { movieId: number }) => item.movieId);
                    const userRatings = ratingsRes.data.map((item: { ratestar: { movieId: number; rating: number } }) => item.ratestar);
                    setWatchlist(watchlistMovieIds);
                    setRatings(userRatings);
                } catch (error) {
                    console.error("Error fetching watchlist and ratings:", error);
                }
            };

            fetchWatchlistAndRatings();
        }}
    )

  // Hàm lấy thông tin phim từ danh sách xem
  const getMoviesFromWatchlist = (): void => {
    if (watchlist.length > 0) {
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
    }
  };

  // Hàm sắp xếp phim
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
      case "userRating":
        return [...movies].sort((a, b) => {
          const ratingA = ratings.find((r) => r.movieId === a.id)?.rating || 0;
          const ratingB = ratings.find((r) => r.movieId === b.id)?.rating || 0;
          return ratingB - ratingA;
        });
      default:
        return movies;
    }
  };

  // Hàm xử lý thay đổi sắp xếp
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = event.target.value;
    setSortCriteria(criteria);
    setCardFilm(sortMovies(cardFilm, criteria));
  };

    // Hook chạy khi component được mount
 

  useEffect(() => {
    if (watchlist.length > 0) {
      getMoviesFromWatchlist();
    }
  }, [watchlist]);

    return (
        <div className="movie-container">
            <Header />
            <br></br>
            <div className="road-to-detail" >
                <h2><span> <i className="fa-solid fa-bookmark"></i> </span>Your Watchlist<span> <i className="fa-solid fa-bookmark"></i></span></h2>
            </div>
            <div className="control-panel">
                <select value={sortCriteria} onChange={handleSortChange}>
                    <option value="alphabet">Alphabetical</option>
                    <option value="voteCount">Number of ratings</option>
                    <option value="voteAverage">IMDB rating</option>
                    <option value="popularity">Popularity</option>
                    <option value="userRating">Your rating</option> {/* Thêm mục sort by your rating */}
                </select>
            </div>

            <div className="total-movies"> <p>Total Movies: {cardFilm.length}</p> </div>
            <div className="movies-grid">
                {cardFilm.map((film, index) => (
                    <div className="movie-card" key={film.id}>
                        <Card
                            id={film.id}
                            image={film.thumbnail}
                            rating={film.vote_average.toFixed(1)}
                            name={`${index + 1}. ${film.title}`}
                            title={""} extract={""} thumbnail={""} banner={""} vote_average={0} trailer={""}
                            popularity={0} vote_count={0} user_rating={film.user_rating} // Thêm xếp hạng của người dùng
                            known_for_department={""} original_name={""} profile_path={""} biography={""} birthday={null} place_of_birth={null}                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Watchlist;
