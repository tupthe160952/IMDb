import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Card from "./Card";
import CelebCardProps from "../types/Interface";
import "../styles/CelebList.css";
import "swiper/swiper-bundle.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CelebCard from "./CelebCard";

const CelebList: React.FC = () => {
  const [celeb, setCeleb] = useState<CelebCardProps[]>([]);

  const getCelebrity = (): void => {
    axios
      .get(`http://localhost:9999/celebs`)
      .then((res) => {
        const sortCeleb = res.data
          .sort(
            (a: CelebCardProps, b: CelebCardProps) =>
              b.popularity - a.popularity
          )
          .slice(0, 15);
        setCeleb(sortCeleb);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
      });
  };

  useEffect(() => {
    getCelebrity();
  }, []);

  return (
    <div className="slidecard">
      <Link className="road-to-detail" to="/popular_person">
        <h2>Popular Celebrities</h2>
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
        {celeb.map((ce) => (
          <SwiperSlide key={ce.id}>
            <div className="form-list">
              <CelebCard
                image={ce.profile_path}
                name={ce.name}
                user_rating={0}
                popularity={0}
                vote_count={0}
                id={0}
                rating={""}
                title={""}
                extract={""}
                thumbnail={""}
                banner={""}
                vote_average={0}
                trailer={""}
                known_for_department={""}
                original_name={""}
                profile_path={""}
                biography={""}
                birthday={null}
                place_of_birth={null}
              ></CelebCard>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CelebList;
