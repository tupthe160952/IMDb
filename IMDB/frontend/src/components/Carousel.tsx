import React, { useState } from "react";
import "../styles/Carousel.css";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  posterImage: string;
  duration: string;
  likeCount: number;
  dislikeCount: number;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <button
        className="carousel__button carousel__button--left"
        onClick={goToPrevious}
      >
        &#8249;
      </button>

      <div className="carousel__item">
        <ItemCard item={items[currentIndex]} />
      </div>

      <button
        className="carousel__button carousel__button--right"
        onClick={goToNext}
      >
        &#8250;
      </button>
    </div>
  );
};

interface ItemCardProps {
  item: CarouselItem;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => (
  <div className="item-card">
    <div className="item-card__poster-container">
      <img
        src={item.posterImage}
        alt="Poster"
        className="item-card__poster-image"
      />
      <span className="item-card__plus-icon">+</span>

      <img src={item.image} alt={item.title} className="item-card__image" />

      <h2 className="item-card__title">{item.title}</h2>

      <p className="item-card__description">{item.description}</p>
      <p className="item-card__duration">{item.duration}</p>
      <div className="item-card__likes">
        <span>❤️ {item.likeCount}</span>
        <span>👎 {item.dislikeCount}</span>
      </div>
    </div>
  </div>
);

export default Carousel;
