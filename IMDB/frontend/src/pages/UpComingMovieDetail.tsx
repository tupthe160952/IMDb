import React from "react";
import Header from "../components/Header";
import UpComingMovieList from "../components/UpComingMovieList";

const UpComingMovieDetail = () => {
  return (
    <div className="upcoming-detail">
      <Header></Header>
      <UpComingMovieList />
    </div>
  );
};

export default UpComingMovieDetail;
