import React, { useState } from "react";
import "../style/rateStar.css";
import { Button } from "react-bootstrap";

const RateStar: React.FC = () => {
    const maxStars = 10;
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => setHoveredStar(index);
    const handleMouseLeave = () => setHoveredStar(null);
    const handleClick = (index: number) => setSelectedRating(index + 1);

    return (
        <div className="rate-star-container mt-5">
            <h6 className="rate-title">RATE THIS</h6>

            <p className="movie-title">1. The Penguin</p>
            
            <div className="stars">
                {Array.from({ length: maxStars }, (_, index) => (
                    <span
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                        className={`star ${
                            (hoveredStar !== null ? index <= hoveredStar : index < (selectedRating ?? 0))
                                ? "star-active"
                                : "star-inactive"
                        }`}
                    >
                        ★
                    </span>
                ))}
            </div>
            <Button
                className="rate-button"
                onClick={() => selectedRating && alert(`You rated: ${selectedRating}`)}
                disabled={!selectedRating}
            >
                Rate
            </Button>
        </div>
    );
};

export default RateStar;