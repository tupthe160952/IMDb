import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import "../styles/GenreDetail.css";
import axios from "axios";
import type GenreDetail from "../types/Interface";

const GenreDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [genre, setGenre] = useState<GenreDetail | null>(null);

  const getGenre = () => {
    axios
      .get(`http://localhost:9999/genres/80`)
      .then((res) => {
        setGenre(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(`This erroe is according to: ` + err);
      });
  };

  useEffect(() => {
    getGenre();
  }, []);
  if (!genre) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Header></Header>
        <div className="genre-detail-form">
          <div className="font-genre-type">
            <img src={genre.image} alt="" />
            <div className="genre-description">
              <Link to={"/"}>
                <span>
                  <i className="fa-solid fa-backward"></i>
                  Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default GenreDetailPage;
