// Carousel.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
import "swiper/swiper-bundle.css";
import SliderProps from "../types/Interface";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "../styles/Carousel.css";
const Carousel2: React.FC = () => {
  const [movies, setMovies] = useState<SliderProps[]>([]);

  const getMovie = (): void => {
    axios
      .get(`http://localhost:9999/movie`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
      });
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="carousel-container">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="carousel-slide">
              <img
                src={movie.banner}
                alt={movie.title}
                className="carousel-image"
              />
              <img
                src={movie.thumbnail}
                alt={`Thumbnail of ${movie.title}`}
                className="carousel-thumbnail"
              />
              <div className="plus-button">+</div>
              <div className="carousel-content">
                <h3>{movie.title}</h3>
                <a
                  href={`https://www.youtube.com/watch?v=${
                    movie.trailer.split("v=")[1]
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel2;
