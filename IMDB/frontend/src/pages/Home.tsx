import React from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import "../styles/Home.css";
import PopularMovie from "../components/PopularMovie";
const items = [
  {
    id: 1,
    title: "Venom: The Last Dancem",
    description: "Watch the trailer",
    image:
      "https://th.bing.com/th/id/OIP.A6zGO_EAGAxKX6WEe4Y_xAHaEo?rs=1&pid=ImgDetMain",
    posterImage:
      "https://th.bing.com/th/id/OIP.OLVTLF6guU6SGCCAvQwfGAHaLH?w=183&h=274&c=7&r=0&o=5&dpr=1.6&pid=1.7",
    duration: "2:09",
    likeCount: 269,
    dislikeCount: 141,
  },
  {
    id: 2,
    title: "The Dark Kight",
    description: "Watch the trailer",
    image:
      "https://th.bing.com/th/id/OIP.jICDIARsfTYEC4-EAD-I7AHaEK?w=329&h=185&c=7&r=0&o=5&dpr=1.6&pid=1.7",
    posterImage:
      "https://th.bing.com/th/id/OIP.zVwg0iGZxaof8gbQWumGKAHaLH?w=183&h=274&c=7&r=0&o=5&dpr=1.6&pid=1.7",
    duration: "2:51",
    likeCount: 22,
    dislikeCount: 6,
  },
  // Add more items as needed
];
const Home: React.FC = () => {
  return (
    <div className="home">
      <Header />
      <Carousel items={items} />
      <PopularMovie />
      <PopularMovie />
      <Footer />
    </div>
  );
};

export default Home;
