import React from "react";
import Carousel from "../components/Carousel";
import CelebList from "../components/CelebList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PopularMovie from "../components/PopularMovie";
import TopMovie from "../components/TopMovie";
import UpComingMovie from "../components/UpComingMovie";
import "../styles/Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Header />
      <Carousel />
      <PopularMovie />
      <CelebList></CelebList>
      <TopMovie />
      <UpComingMovie />
      <div style={{ textAlign: 'center' }}>
        <img src="https://8xbet-link.com/wp-content/uploads/2024/10/banner-8xbetmx-2048x469.webp" alt="nhacai8xbet" style={{ height: '200px', width: '80%' }} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
