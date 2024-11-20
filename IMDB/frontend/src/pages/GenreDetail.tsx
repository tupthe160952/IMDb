import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/GenreDetail.css";
import axios from "axios";
import type GenreDetail from "../types/Interface";
import GenreList from "../components/GenreList";

const GenreDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [genre, setGenre] = useState<GenreDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getGenre = () => {
    axios
      .get(`http://localhost:9999/genres?id=${id}`)
      .then((res) => {
        setGenre(res.data[0]);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching genre:", err);
      });
  };

  useEffect(() => {
    getGenre();
    console.log(genre);
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!genre) {
    return <div>Loading...</div>; // Hiển thị khi dữ liệu đang được tải
  } else {
    return (
      <div style={{ backgroundColor: "black" }}>
        <Header></Header>
        <div className="font-genre-type">
          <div className="description-genre">
            <img className="genre-image" src={genre.image} alt={genre.name} />
            <div className="genre-description">
              <Link to={"/"} className="link-genre">
                <span className="back-btn">
                  <i className="fa-solid fa-backward"></i>
                  Home
                </span>
              </Link>
              <h2 className="name-genre">{genre.name}</h2>
              <p className="text-genre">{genre.description}</p>
            </div>
          </div>
          <div className="genre-products">
            <div className="popular-movies-genre">
              <GenreList movieId={id} titlegenre={"Popular Movies"}></GenreList>
            </div>
            <div className="toprated-movies-genre"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default GenreDetailPage;
