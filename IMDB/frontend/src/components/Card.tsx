import React, { useState, useEffect } from "react";
import "../styles/card.css";
import CardProps from "../types/Interface";
import { useUser } from "./UserContext";
import axios from "axios";

const Card: React.FC<CardProps> = (props) => {
  const { user } = useUser();
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    if (user) {
      // Check if the movie is already in the watchlist
      axios.get(`http://localhost:9999/watchlist?userId=${user.id}&movieId=${props.id}`)
        .then((res) => {
          if (res.data.length > 0) {
            setInWatchlist(true);
          }
        })
        .catch((error) => {
          console.error("Error checking watchlist:", error);
        });
    }
  }, [user, props.id]);

  const handleWatchlistToggle = () => {
    if (!user) {
      alert("Please log in to add to your watchlist.");
      return;
    }

    if (inWatchlist) {
      // Remove from watchlist
      axios.delete(`http://localhost:9999/watchlist?userId=${user.id}&movieId=${props.id}`)
        .then(() => {
          setInWatchlist(false);
          alert("Removed from watchlist");
        })
        .catch((error) => {
          console.error("Error removing from watchlist:", error);
        });
    } else {
      // Add to watchlist
      axios.post("http://localhost:9999/watchlist", {
        userId: user.id,
        movieId: props.id,
      })
        .then(() => {
          setInWatchlist(true);
          alert("Added to watchlist");
        })
        .catch((error) => {
          console.error("Error adding to watchlist:", error);
        });
    }
  };

  return (
    <div className="card text-white" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="card-img-wrapper">
        <img src={props.image} alt="Movie poster" className="card-img-top" />
        <div className="icon-button-wrapper">
          <button
            type="button"
            className="btn btn-dark btn-sm rounded-circle"
            style={{ backgroundColor: inWatchlist ? "#FFD700" : "#5f5f5f", color: inWatchlist ? "black" : "" }}
            aria-label="Description of Button"
          >
            <i className={inWatchlist ? "fas fa-check" : "fas fa-plus"}></i>
          </button>
        </div>
      </div>
      <div className="card-body"> 
        <div className="rating-wrapper">
          <span className="rating" style={{ fontSize: "18px" }}>
            {props.rating}
          </span>
          <button className="star-button" aria-label="Rate this item">
            <i className="fas fa-star star-icon"></i>
          </button>
        </div>

        <h4 className="card-title" style={{ marginBottom: "15px" }}>
          {props.name}
        </h4>
        <button
          className="btn btn-dark card-button"
          style={{ backgroundColor: inWatchlist ? "" : "#5f5f5f" }}
          onClick={handleWatchlistToggle}
        >
          <i className={inWatchlist ? "fas fa-check" : "fas fa-plus"} mr-2></i> {inWatchlist ? "Added to Watchlist" : "Watchlist"}
        </button>
        <button
          className="btn btn-dark card-button"
          style={{ backgroundColor: "#5f5f5f" }}
        >
          <i className="fas fa-play mr-2"></i> Trailer
        </button>
      </div>
    </div>
  );
};

export default Card;
