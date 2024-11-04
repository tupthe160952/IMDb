import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import '../styles/card.css';


const Card: React.FC = () => {
    return (
        <div className="card bg-secondary text-white">
            <div className="card-img-wrapper">
                <img
                    src="https://placehold.co/256x384"
                    alt="Movie poster"
                    className="card-img-top"
                />
                <div className="icon-button-wrapper">
                    <button className="btn btn-dark btn-sm rounded-circle">
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div className="card-body">
                <div className="rating-wrapper">
                    <span className="rating">7.6/10</span>
                    <button className="star-button" aria-label="Rate this item">
                        <i className="fas fa-star star-icon"></i>
                    </button>
                </div>

                <h3 className="card-title">Film Name</h3>
                <button className="btn btn-dark card-button">
                    <i className="fas fa-plus mr-2"></i> Watchlist
                </button>
                <button className="btn btn-dark card-button">
                    <i className="fas fa-play mr-2"></i> Trailer
                </button>
            </div>
        </div>
    );
};

export default Card;
