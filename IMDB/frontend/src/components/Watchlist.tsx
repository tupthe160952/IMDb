import React, { useState, useEffect } from 'react';
import '../styles/Watchlist.css';
import { useNavigate } from 'react-router-dom';

const Watchlist: React.FC = () => {

  const [watchlist, setWatchlist] = useState<any[]>([]);
 

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    // Fetch movie details from the server or local JSON file
    const fetchMovies = async () => {
      const movies = await Promise.all(
        storedWatchlist.map(async (id: number) => {
          const response = await fetch(`http://localhost:9999/movies/${id}`);
          return await response.json();
        })
      );
      setWatchlist(movies);
    };
    fetchMovies();
  }, []);

  return (
    <div className="watchlist-container">
      <h1 className="watchlist-title">Your Watchlist</h1>
      <div className="watchlist-grid">
        {watchlist.map(movie => (
          <div key={movie.id} className="card text-white" style={{ backgroundColor: "#1a1a1a" }}>
            <div className="card-img-wrapper">
              <img src={movie.thumbnail} alt="Movie poster" className="card-img-top" />
              <div className="icon-button-wrapper">
                <button
                  type="button"
                  className="btn btn-dark btn-sm rounded-circle"
                  aria-label="Description of Button"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="rating-wrapper">
                <span className="rating" style={{ fontSize: "18px" }}>
                  {movie.vote_average}
                </span>
                <button className="star-button" aria-label="Rate this item">
                  <i className="fas fa-star star-icon"></i>
                </button>
              </div>

              <h4 className="card-title" style={{ marginBottom: "15px" }}>
                {movie.title}
              </h4>
              <button
                className="btn btn-dark card-button"
                style={{ backgroundColor: "#FFD700" }}
              >
                <i className="fas fa-check mr-2"></i> Watchlist
              </button>
              <button
                className="btn btn-dark card-button"
                style={{ backgroundColor: "#5f5f5f" }}
              >
                <i className="fas fa-play mr-2"></i> Trailer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
