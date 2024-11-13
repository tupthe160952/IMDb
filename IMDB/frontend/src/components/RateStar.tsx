import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/rateStar.css";

// Khai báo kiểu cho props
interface RateStarProps {
    handleRateStar: (rating: number) => void;
    currentRating: number | null;
}

const RateStar: React.FC<RateStarProps> = ({ handleRateStar, currentRating }) => {
    const maxStars = 10;
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    useEffect(() => {
        setSelectedRating(currentRating);
    }, [currentRating]);

    const handleMouseEnter = (index: number) => setHoveredStar(index);
    const handleMouseLeave = () => setHoveredStar(null);
    const handleClick = (index: number) => setSelectedRating(index + 1);

    const handleRateButtonClick = () => {
        if (selectedRating !== null) {
            handleRateStar(selectedRating);
        }
    };

    return (
        <div className="rate-star-container">
            <h6 className="rate-title">RATE THIS</h6>

            <p className="movie-title">Film Name</p>

            <div className="stars">
                {Array.from({ length: maxStars }, (_, index) => (
                    <span
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                        className={`star ${(hoveredStar !== null ? index <= hoveredStar : index < (selectedRating ?? 0))
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
                onClick={handleRateButtonClick}
                disabled={selectedRating === null}
            >
                Rate
            </Button>
        </div>
    );
};

export default RateStar;
