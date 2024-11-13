import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../styles/card.css";
import CardProps from "../types/Interface";
import RateStar from "./RateStar";
import { useUser } from "./UserContext";

const Card: React.FC<CardProps> = (props) => {
  const { user } = useUser();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watchlistItemId, setWatchlistItemId] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [userRatingId, setUserRatingId] = useState<number | null>(null);
  const [showRateModal, setShowRateModal] = useState(false);
  const [voteAverage, setVoteAverage] = useState<number>(0);
  const [voteCount, setVoteCount] = useState<number>(0);


  useEffect(() => {
    if (user) {
      // Check if the movie is already in the watchlist
      axios.get(`http://localhost:9999/watchlist`, { params: { userId: user.id, movieId: props.id } })
        .then((res) => {
          if (res.data.length > 0) {
            setInWatchlist(true);
            setWatchlistItemId(res.data[0].id); // Save ID of watchlist item
          }
        })
        .catch((error) => {
          console.error("Error checking watchlist:", error);
        });
    }
  }, [user, props.id]);

  const handleWatchlistToggle = async () => {
    if (!user) {
      alert("Please log in to add to your watchlist.");
      window.location.href = '/login';
      return;
    }

    if (inWatchlist && watchlistItemId !== null) {
      try {
        const response = await axios.delete(`http://localhost:9999/watchlist/${watchlistItemId}`);
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
          movieId: props.id,
        });
        if (response.status === 200 || response.status === 201) {
          setInWatchlist(true);
          setWatchlistItemId(response.data.id); // Save ID of newly added item
          alert("Added to watchlist");
        }
      } catch (error) {
        console.error("Error adding to watchlist:", error);
      }
    }
  };
  // Rate Star
  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:9999/ratings?userId=${user.id}&movieId=${props.id}`)
        .then((res) => {
          const userRatingData = res.data.find((rating: { ratestar: { movieId: number, rating: number }, id: number }) => rating.ratestar.movieId === props.id);
          if (userRatingData) {
            setUserRating(userRatingData.ratestar.rating);
            setUserRatingId(userRatingData.id);
          }
        })
        .catch((error) => {
          console.error("Error checking user rating:", error);
        });
    }
  }, [user, props.id]);

  const handleRateStar = (rating: number) => {
    if (!user) {
      alert("Please log in to rate this movie.");
      return;
    } else {
      if (userRating !== null) {
        axios.put(`http://localhost:9999/ratings/${userRatingId}`, {
          userId: user.id,
          ratestar: {
            movieId: props.id,
            rating: rating,
          },
        })
          .then(() => {
            setUserRating(rating);
            alert("Your rating has been updated.");
  
            axios.get(`http://localhost:9999/movie/${props.id}`)
              .then((response) => {
                const movieData = response.data;
                const { vote_average, vote_count } = movieData;
  
                // Tính lại điểm trung bình mà không thay đổi vote_count
                const newVoteAverage = ((vote_average * vote_count) - userRating + rating) / vote_count;
  
                // Cập nhật movieData với vote_average mới
                const updatedMovieData = {
                  ...movieData,
                  vote_average: newVoteAverage,
                };
  
                axios.put(`http://localhost:9999/movie/${props.id}`, updatedMovieData)
                  .then(() => {
                    console.log("Movie rating updated successfully.");
                    setVoteAverage(newVoteAverage);
                  })
                  .catch((error) => {
                    console.error("Error updating movie data:", error);
                  });
              })
              .catch((error) => {
                console.error("Error fetching movie data:", error);
              });
          })
          .catch((error) => {
            console.error("Error updating rating:", error);
          });
      } else {
        axios.post("http://localhost:9999/ratings", {
          userId: user.id,
          ratestar: {
            movieId: props.id,
            rating: rating,
          },
        })
          .then(() => {
            setUserRating(rating);
            alert("Thank you for your rating!");
  
            axios.get(`http://localhost:9999/movie/${props.id}`)
              .then((response) => {
                const movieData = response.data;
                const { vote_average, vote_count } = movieData;
  
                const newVoteCount = vote_count + 1;
                const newVoteAverage = ((vote_average * vote_count) + rating) / newVoteCount;
  
                const updatedMovieData = {
                  ...movieData,
                  vote_average: newVoteAverage,
                  vote_count: newVoteCount,
                };
  
                axios.put(`http://localhost:9999/movie/${props.id}`, updatedMovieData)
                  .then(() => {
                    console.log("Movie rating updated successfully.");
                    setVoteAverage(newVoteAverage);
                    setVoteCount(newVoteCount);
                  })
                  .catch((error) => {
                    console.error("Error updating movie data:", error);
                  });
              })
              .catch((error) => {
                console.error("Error fetching movie data:", error);
              });
          })
          .catch((error) => {
            console.error("Error submitting rating:", error);
          });
      }
    }
  };
  


  const handleRateButtonClick = () => {
    setShowRateModal(true);
  };

  const handleCloseModal = () => {
    setShowRateModal(false);
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
            onClick={handleWatchlistToggle}
          >
            <i className={inWatchlist ? "fas fa-check" : "fas fa-plus"}></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="rating-wrapper">
          <span className="rating" style={{ fontSize: "18px", color: "white" }}>
            {Number(props.rating).toFixed(1)} / 10
          </span>
          <button className="star-button" aria-label="Rate this item" onClick={handleRateButtonClick}>
            {userRating !== null ? (
              <i className="fas fa-star star-icon"></i>
            ) : (
              <i className="bi bi-star"></i>
            )}
          </button>
          <span className="rating" style={{ fontSize: "18px" }}>
            {userRating !== null ? `${userRating}` : "0"}
          </span>
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

      {/* RateStar Modal */}
      <Modal show={showRateModal} onHide={handleCloseModal}>
        <Modal.Body className="custom-modal-content">
          <RateStar handleRateStar={handleRateStar} currentRating={userRating} />
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default Card;
