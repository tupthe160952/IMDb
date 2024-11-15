import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "../styles/PopularMovieDetail.css";
import CardProps from "../types/Interface";

const PopularMovieList: React.FC = () => {
  const [cardFilm, setCardFilm] = useState<CardProps[]>([]);
  const getPopularMovie = (): void => {
    axios
      .get(`http://localhost:9999/movie`)
      .then((res) => {
        setCardFilm(res.data);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
      });
  };
  useEffect(() => {
    getPopularMovie();
  }, []);
  return (
    <div className="outside">
      <div className="popular-page">
        <div className="description">
          <h2>IMDb Charts</h2>
          <p className="motto">Most Popular Movies</p>
          <p className="motto-down">Ad determined by IMDb users</p>
          <div className="filter">
            <p className="tips">100 Titles</p>
            <span>
              Sort by:{" "}
              <select name="sort-by">
                <option value="ranking">Ranking</option>
                <option value="imdb-rating">IMDb Rating</option>
                <option value="date">Release Date</option>
                <option value="number-rating">Number of Rating</option>
                <option value="alphabet">Alphabetically</option>
                <option value="popularity">Popularity</option>
              </select>
            </span>
          </div>
        </div>
        <div className="list">
          {cardFilm.map((film) => (
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
              trailer={""} user_rating={0} popularity={0} vote_count={0} known_for_department={""} original_name={""} profile_path={""} biography={""} birthday={null} place_of_birth={null}            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularMovieList;
