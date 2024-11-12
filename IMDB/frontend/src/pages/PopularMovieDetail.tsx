import React from "react";
import Header from "../components/Header";
import PopularMovieList from "../components/PopularMovieList";

const PopularMovieDetail = () => {
  return (
    <div className="popular-detail">
      <Header></Header>
      <PopularMovieList></PopularMovieList>
    </div>
  );
};

export default PopularMovieDetail;
