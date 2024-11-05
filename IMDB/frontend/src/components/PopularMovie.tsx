import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Card from "../components/Card";
import CardProps from "../types/Interface";
import "../styles/PopularMovie.css";
import "swiper/swiper-bundle.css";

const PopularMovie: React.FC = () => {
  const [cardFilm, setCardFilm] = useState<CardProps[]>([
    {
      id: 1,
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/r/s/rsz_vnm3_intl_online_1080x1350_tsr_01.jpg",
      rating: "8.5",
      name: "Venom",
    },
    {
      id: 2,
      image:
        "https://acrn.com/wp-content/uploads/2024/10/the_substance-265285928-large.jpg",
      rating: "7.5",
      name: "The Substance",
    },
    {
      id: 3,
      image:
        "https://m.media-amazon.com/images/M/MV5BZjM2M2E3YzAtZDJjYy00MDhkLThiYmItOGZhNzQ3NTgyZmI0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      rating: "7.5",
      name: "The Wild Robot",
    },
    {
      id: 4,
      image:
        "https://m.media-amazon.com/images/M/MV5BNzc2MWUyYzctY2E4Ny00ZTlmLThjNTMtMTViZGI5NjcyN2EzXkEyXkFqcGc@._V1_.jpg",
      rating: "7.5",
      name: "Terrifier 3",
    },
    {
      id: 5,
      image:
        "https://yc.cldmlk.com/efmm2z50m9vrkwmgyt4jv8j1r0/uploads/vertical_2e562bfd-01d8-49ad-9978-a08c46c41433.jpg",
      rating: "7.5",
      name: "Gladiator 2",
    },
    {
      id: 6,
      image:
        "https://kenh14cdn.com/203336854389633024/2024/10/16/mv5bymu3mzyzowetotdkzi00yza1ltlimzqtnddizdbjy2finmflxkeyxkfqcgcv1fmjpgux1000-17290595888911211497058-1729066698040-172906670055969241828.jpg",
      rating: "7.5",
      name: "The Penguin",
    },
  ]);

  return (
    <div className="slidecard">
      <h2>Popular Movies</h2>
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
              image={film.image}
              rating={film.rating}
              name={film.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularMovie;
