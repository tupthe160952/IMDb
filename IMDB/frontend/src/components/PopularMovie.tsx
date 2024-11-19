import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Card from "../components/Card";
import CardProps from "../types/Interface";
import "../styles/PopularMovie.css";
import "swiper/swiper-bundle.css";
import axios from "axios";
import { Link } from "react-router-dom";

const PopularMovie: React.FC = () => {
  const [cardFilm, setCardFilm] = useState<CardProps[]>([]);

  const getPopularMovie = (): void => {
    axios
      .get(`http://localhost:9999/movie`)
      .then((res) => {
        const sortFilm = res.data
          .sort((a: CardProps, b: CardProps) => b.popularity - a.popularity)
          .slice(0, 15);
        setCardFilm(sortFilm);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
      });
  };

  useEffect(() => {
    getPopularMovie();
  }, []);

  return (
    <div className="slidecard">
      <Link className="road-to-detail" to="/detailpopular">
        <h2>Popular Movies</h2>
        <i className="fa-solid fa-forward"></i>
      </Link>

      <Swiper
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={20}
        navigation
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        style={{ width: "100%", maxWidth: "1300px", margin: "0 auto" }}
      >
        {cardFilm.map((film) => (
          <SwiperSlide key={film.id}>
            <Card
              id={film.id}
              image={film.thumbnail}
              rating={film.vote_average.toFixed(1)}
              name={film.title}
              title={""}
              extract={""}
              thumbnail={""}
              banner={""}
              vote_average={0}
              trailer={""}
              popularity={0}
              vote_count={0}
              user_rating={0}
              known_for_department={""}
              original_name={""}
              profile_path={""}
              biography={""}
              birthday={null}
              place_of_birth={null}
              genres={[]}
              description={""}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularMovie;
