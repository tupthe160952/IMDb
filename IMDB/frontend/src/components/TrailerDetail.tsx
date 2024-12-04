import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from './UserContext';

const Trailer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [genres, setGenres] = useState<any>([]);
    const [inWatchlist, setInWatchlist] = useState(false);
    const [watchlistItemId, setWatchlistItemId] = useState<number | null>(null);
    const { user } = useUser();  

    useEffect(() => {
        // Fetch movie data
        axios
            .get(`http://localhost:9999/movie?id=${id}`)
            .then((response) => {
                console.log("Movie data:", response.data);
                setMovie(response.data[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movie data:', error);
                setLoading(false);
            });

        // Fetch genre data
        axios
            .get('http://localhost:9999/genres')
            .then((response) => {
                console.log("Genres data:", response.data);
                setGenres(response.data);
            })
            .catch((error) => {
                console.error('Error fetching genres:', error);
            });

        if (user) {
            axios
                .get(`http://localhost:9999/watchlist`, {
                    params: { userId: user.id, movieId: id },
                })
                .then((res) => {
                    if (res.data.length > 0) {
                        setInWatchlist(true);
                        setWatchlistItemId(res.data[0].id);
                    }
                })
                .catch((error) => {
                    console.error("Error checking watchlist:", error);
                });
        }
    }, [id, user]);

    const handleWatchlistToggle = async () => {
        if (!user) {
            alert("Please log in to add to your watchlist.");
            window.location.href = "/login";
            return;
        }

        if (inWatchlist && watchlistItemId !== null) {
            try {
                const response = await axios.delete(
                    `http://localhost:9999/watchlist/${watchlistItemId}`
                );
                if (response.status === 200 || response.status === 204) {
                    setInWatchlist(false);
                    setWatchlistItemId(null);
                    alert("Removed from watchlist");
                }
            } catch (error) {
                console.error("Error removing from watchlist:", error);
            }
        } else {
            try {
                const response = await axios.post("http://localhost:9999/watchlist", {
                    userId: user.id,
                    movieId: id,
                });
                if (response.status === 200 || response.status === 201) {
                    setInWatchlist(true);
                    setWatchlistItemId(response.data.id); 
                    alert("Added to watchlist");
                }
            } catch (error) {
                console.error("Error adding to watchlist:", error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!movie) {
        return <div>Movie not found.</div>;
    }

    const movieGenres = movie.genres.map((genreId: number) => {
        const genre = genres.find((g: any) => g.id === genreId);
        return genre ? genre.name : null;
    });

    console.log("Mapped genres:", movieGenres);

    return (
        <div className="text-white py-4" style={{ width: '100%' }}>
            <div className="row w-100 mx-0">
                <div className="col-7 text-start ps-3">
                    <div className="mb-4">
                        <p>{movie.overview}</p>
                    </div>
                    <hr />

                    <div className="mb-4">
                        <p>
                            <strong>Stars:</strong> {movie.cast.join(' · ')}
                        </p>
                        <hr />
                        <p>
                            <strong>Genres:</strong> {movieGenres.join(' · ')}
                        </p>
                        <hr />
                    </div>

                    <div>
                        <a href="#" className="text-info">
                            See production info at IMDbPro
                        </a>
                    </div>
                </div>

                <div className="col-3 d-flex flex-column align-items-start" style={{ margin: '25px 0 0 150px' }}>
                    <div className="mb-4">
                        <strong>Release Date:</strong>
                        <p>{movie.date}</p>
                    </div>

                    <button
                        className="btn btn-warning w-100 mb-3"
                        onClick={handleWatchlistToggle}
                    >
                        <strong>{inWatchlist ? "- Remove to Watchlist" : "+ Add to Watchlist"}</strong>
                    </button>
                </div>

                <div className="col-2"></div>
            </div>
        </div>
    );
};

export default Trailer;