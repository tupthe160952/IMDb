import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Card from "../components/Card";
import CardProps from "../types/Interface";
import "../styles/PopularMovie.css";
import "swiper/swiper-bundle.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from  "./UserContext"; // Giả sử bạn có một context để quản lý thông tin người dùng

const Watchlist: React.FC = () => {
  const [cardFilm, setCardFilm] = useState<CardProps[]>([]);
  const { user } = useUser(); // Lấy thông tin người dùng từ context

  const getWatchlistMovies = async (): Promise<void> => {
    if (!user) return; // Nếu không có người dùng, không làm gì cả

    try {
      // Lấy watchlist của người dùng
      const watchlistResponse = await axios.get(`http://localhost:9999/watchlist?userId=${user.id}`);
      const watchlist = watchlistResponse.data;

      // Lấy danh sách phim
      const moviesResponse = await axios.get(`http://localhost:9999/movie`);
      const allMovies = moviesResponse.data;

      // Lọc các phim có trong watchlist
      const watchlistMovies = allMovies.filter((movie: { id: any; }) => 
        watchlist.some((item: { movieId: any; }) => item.movieId === movie.id)
      );

      // Sắp xếp các phim theo độ phổ biến
      const sortedMovies = watchlistMovies.sort((a: CardProps, b: CardProps) => b.popularity - a.popularity);

      setCardFilm(sortedMovies);
    } catch (error) {
      console.error("Error fetching watchlist movies:", error);
    }
  };

  useEffect(() => {
    getWatchlistMovies(); // Gọi hàm lấy dữ liệu watchlist
  }, [user]); // Chạy lại khi người dùng thay đổi

  return (
    <div className="slidecard">
      <Link className="road-to-detail" to="/detailwatchlist">
        <h2>My Watchlist</h2>
        <i className="fa-solid fa-forward"></i>
      </Link>

      <Swiper
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={20}
        navigation
        modules={[Navigation]}
        breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }, // Thay đổi số lượng slide hiển thị cho màn hình lớn
            1300: { slidesPerView: 4 }, // Thay đổi số lượng slide hiển thị cho màn hình lớn
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
                    date={""} genders={""}  known_for={[]}            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Watchlist;