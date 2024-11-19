// PopularMovie.tsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Card from "../components/Card";
import CardProps from "../types/Interface";
import "../styles/PopularMovie.css";
import "swiper/swiper-bundle.css";
import axios from "axios";
import { Link } from "react-router-dom";

const UpComingMovie: React.FC = () => {
  const [cardFilm, setCardFilm] = useState<CardProps[]>([]);

  // const getUpComingMovie = (): void => {
  //   axios
  //     .get(`http://localhost:9999/upComingMovie`)
  //     .then((res) => {
  //       setCardFilm(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching upcoming movies:", error);
  //     });
  // };
  const getUpComingMovie = (): void => {
    axios
      .get(`http://localhost:9999/movie`)
      .then((res) => {
        const moviesIn2025 = res.data.filter((movie: CardProps) => {
          // Lấy phần năm từ chuỗi "dd/MM/yyyy"
          const movieYear = parseInt(movie.date.split("/")[2], 10);
          return movieYear === 2025; // Kiểm tra xem năm có phải 2025
        });
        setCardFilm(moviesIn2025);
      })
      .catch((error) => {
        console.error("Error fetching upcoming movies:", error);
      });
  };

  useEffect(() => {
    getUpComingMovie();
  }, []);

  return (
    <div className="slidecard">
      <Link className="road-to-detail" to="/detailupcoming">
        <h2>Coming soon</h2>
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
              rating={film.vote_average}
              name={film.title}
              title={""}
              extract={""}
              thumbnail={""}
              banner={""}
              vote_average={0}
              trailer={""}
              popularity={undefined}
              vote_count={undefined}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UpComingMovie;
