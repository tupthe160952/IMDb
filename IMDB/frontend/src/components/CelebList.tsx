import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "../styles/CelebList.css";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import CelebCard from "./CelebCard";
import Celebs from '../types/Interface';

const CelebList: React.FC = () => {
  const [celeb, setCeleb] = useState<Celebs[]>([]);

  useEffect(() => {
    // Fetch the data from the local JSON file or API
    fetch('http://localhost:9999/celebs')
        .then((response) => response.json())
        .then((data) => {
            // Sort the data by popularity in descending order
            const sortedData = data.sort((a: Celebs, b: Celebs) => b.popularity - a.popularity);
            setCeleb(sortedData);
        })
        .catch((error) => console.error('Error fetching data:', error));
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
              <CelebCard {...ce}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CelebList;
