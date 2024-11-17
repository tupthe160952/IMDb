import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "../styles/PopularMovieDetail.css";
import CardProps from "../types/Interface";
import { useUser } from "./UserContext";

const UpComingMovieList: React.FC = () => {
  const { user } = useUser();
  const [cardFilm, setCardFilm] = useState<CardProps[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("popularity");
  const [ratings, setRatings] = useState<{ movieId: number; rating: number }[]>(
    []
  );

  const getUpComningMovie = (): void => {
    axios
      .get(`http://localhost:9999/upComingMovie`)
      .then((res) => {
        setCardFilm(res.data);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
      });
  };

  const getRatings = (): void => {
    if (user) {
      axios
        .get(`http://localhost:9999/ratings`, { params: { userId: user.id } })
        .then((res) => {
          const userRatings = res.data.map(
            (item: { ratestar: { movieId: number; rating: number } }) =>
              item.ratestar
          );
          setRatings(userRatings);
        })
        .catch((error) => {
          console.error("Error fetching ratings:", error);
        });
    }
  };

  const sortMovies = (movies: CardProps[], criteria: string): CardProps[] => {
    switch (criteria) {
      case "alphabet":
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case "voteCount":
        return [...movies].sort((a, b) => b.vote_count - a.vote_count);
      case "voteAverage":
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      case "userRating":
        return [...movies].sort((a, b) => {
          const ratingA = ratings.find((r) => r.movieId === a.id)?.rating || 0;
          const ratingB = ratings.find((r) => r.movieId === b.id)?.rating || 0;
          return ratingB - ratingA;
        });
      default:
        return movies;
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = event.target.value;
    setSortCriteria(criteria);
    setCardFilm(sortMovies(cardFilm, criteria));
  };

  useEffect(() => {
    getUpComningMovie();
    getRatings();
  }, []);

  return (
    <div className="outside">
      <div className="popular-page">
        <div className="description">
          <h2>IMDb Charts</h2>
          <p className="motto">Upcoming Movies</p>
          <p className="motto-down">Ad determined by IMDb users</p>
          <div className="filter">
            <p className="tips">100 Titles</p>
            <span>
              Sort by:{" "}
              <select value={sortCriteria} onChange={handleSortChange}>
                <option value="alphabet">Alphabetically</option>
                <option value="voteCount">Number of ratings</option>
                <option value="voteAverage">IMDB Rating</option>
                <option value="userRating">Your rating</option>{" "}
                {/* Thêm mục sort by your rating */}
              </select>
            </span>
          </div>
        </div>
        <div className="list">
          {cardFilm.map((film, index) => (
            <Card
              id={film.id}
              image={film.thumbnail}
              rating={film.vote_average}
              // name={`${index + 1}. ${film.title} `}
              name={film.title}
              title={""}
              extract={""}
              thumbnail={""}
              banner={""}
              vote_average={0}
              trailer={""}
              popularity={0}
              vote_count={0}
              user_rating={film.user_rating}
              known_for_department={""}
              original_name={""}
              profile_path={""}
              biography={""}
              birthday={null}
              place_of_birth={null}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpComingMovieList;
