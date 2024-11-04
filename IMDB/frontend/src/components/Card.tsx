import React from 'react';
import '../styles/card.css';


const Card: React.FC = () => {
    return (
        <div className="card text-white" style={{backgroundColor: '#1a1a1a'}}>
            <div className="card-img-wrapper">
                <img
                    src="https://placehold.co/256x384"
                    alt="Movie poster"
                    className="card-img-top"
                />
                <div className="icon-button-wrapper">
                    <button type="button" className="btn btn-dark btn-sm rounded-circle" aria-label="Description of Button">
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div className="card-body">
                <div className="rating-wrapper">
                    <span className="rating" style={{fontSize: '18px'}}>7.6/10</span>
                    <button className="star-button" aria-label="Rate this item">
                        <i className="fas fa-star star-icon"></i>
                    </button>
                </div>

                <h4 className="card-title" style={{ marginBottom: '15px' }}>Film Name</h4>
                <button className="btn btn-dark card-button" style={{backgroundColor: '#5f5f5f'}}>
                    <i className="fas fa-plus mr-2"></i> Watchlist
                </button>
                <button className="btn btn-dark card-button" style={{backgroundColor: '#5f5f5f'}}>
                    <i className="fas fa-play mr-2"></i> Trailer
                </button>
            </div>
        </div>
    );
};

export default Card;
