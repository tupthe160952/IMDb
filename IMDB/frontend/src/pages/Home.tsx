import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import "../styles/Home.css";
import PopularMovie from "../components/PopularMovie";
import TopMovie from "../components/TopMovie";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Header />
      <Carousel />
      <PopularMovie />
      <TopMovie />
      <Footer />
    </div>
  );
};

export default Home;
