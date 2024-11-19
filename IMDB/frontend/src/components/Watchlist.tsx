import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CardProps from "../types/Interface";
import Genre from "../types/Interface";
import "../styles/watchlist.css";
import axios from "axios";
import Header from "../components/Header";
import { useUser } from "./UserContext";

const Watchlist: React.FC = () => {
    const { user } = useUser();
    const [cardFilm, setCardFilm] = useState<CardProps[]>([]);
    const [watchlist, setWatchlist] = useState<number[]>([]);
    const [ratings, setRatings] = useState<{ movieId: number; rating: number }[]>([]);
    const [sortCriteria, setSortCriteria] = useState<string>("alphabet");
    const [fetchedMovies, setFetchedMovies] = useState<{ [key: number]: CardProps }>({});
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

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
        }
    }, [user]);

    // Hàm lấy thông tin phim từ danh sách xem
    const getMoviesFromWatchlist = async (): Promise<void> => {
        if (watchlist.length > 0) {
            const promises = watchlist.map(async (id) => {
                if (fetchedMovies[id]) {
                    return fetchedMovies[id];
                } else {
                    const response = await axios.get(`http://localhost:9999/movie/${id}`);
                    return response.data;
                }
            });

            Promise.all(promises)
                .then((movies) => {
                    const updatedFetchedMovies = { ...fetchedMovies };
                    movies.forEach(movie => {
                        updatedFetchedMovies[movie.id] = movie;
                    });
                    setFetchedMovies(updatedFetchedMovies);
                    setCardFilm(sortMovies(movies, sortCriteria, selectedGenre));
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy danh sách phim từ watchlist:", error);
                });
        }
    };

    // Hàm lấy danh sách thể loại từ db.json
    const fetchGenres = async (): Promise<void> => {
        try {
            const response = await axios.get<Genre[]>(`http://localhost:9999/genres`);
            setGenres(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách thể loại:", error);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    // Hàm sắp xếp phim
    const sortMovies = (movies: CardProps[], criteria: string, genre: number | null): CardProps[] => {
        let sortedMovies = [...movies];

        if (genre) {
            sortedMovies = sortedMovies.filter(movie => movie.genres.includes(genre));
        }

        switch (criteria) {
            case "alphabet":
                return sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
            case "voteCount":
                return sortedMovies.sort((a, b) => b.vote_count - a.vote_count);
            case "voteAverage":
                return sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
            case "popularity":
                return sortedMovies.sort((a, b) => b.popularity - a.popularity);
            case "userRating":
                return sortedMovies.sort((a, b) => {
                    const ratingA = ratings.find((r) => r.movieId === a.id)?.rating || 0;
                    const ratingB = ratings.find((r) => r.movieId === b.id)?.rating || 0;
                    return ratingB - ratingA;
                });
            default:
                return sortedMovies;
        }
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const genreId = Number(event.target.value);
        setSelectedGenre(genreId);
        setCardFilm(sortMovies(cardFilm, sortCriteria, genreId));
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const criteria = event.target.value;
        setSortCriteria(criteria);
        setCardFilm(sortMovies(cardFilm, criteria, selectedGenre));
    };

    useEffect(() => {
        if (watchlist.length > 0) {
            getMoviesFromWatchlist();
        }
    }, [watchlist, sortCriteria, selectedGenre]);

    return (
        <div className="watchlist ">
            <div className="movie-container">
                <Header />
                <br />
                <div className="road-to-watchlist">
                    <h2><span><i className="fa-solid fa-bookmark"></i></span> Your Watchlist <span><i className="fa-solid fa-bookmark"></i></span></h2>
                </div>
                <div className="control-panel">
                    <h1>Sort by</h1>
                    <select value={sortCriteria} onChange={handleSortChange}>
                        <option value="alphabet">Alphabetical</option>
                        <option value="voteCount">Number of ratings</option>
                        <option value="voteAverage">IMDB rating</option>
                        <option value="popularity">Popularity</option>
                        <option value="userRating">Your rating</option>
                    </select>
                    <select value={selectedGenre || ''} onChange={handleGenreChange}>
                        <option value="">All Genres</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                    <h5 className="total-movies">Total Movies: {cardFilm.length}</h5>
                </div>
                <div className="movies-grid">
                    {cardFilm.map((film, index) => (
                        <div className="movie-card" key={film.id}>
                            <Card
                                id={film.id}
                                image={film.thumbnail}
                                rating={film.vote_average.toFixed(1)}
                                name={`${index + 1}. ${film.title}`}
                                title={""} extract={""} thumbnail={""} banner={""} vote_average={0} trailer={""}
                                popularity={0} vote_count={0} user_rating={film.user_rating}
                                known_for_department={""} original_name={""} profile_path={""} biography={""} birthday={null} place_of_birth={null} genres={[]} description={""} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Watchlist;