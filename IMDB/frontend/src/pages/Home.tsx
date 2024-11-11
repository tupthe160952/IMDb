import React from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import "../styles/Home.css";
import PopularMovie from "../components/PopularMovie";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Header />
      <Carousel />
      <PopularMovie />
      <PopularMovie />
      <Footer />
    </div>
  );
};

export default Home;
