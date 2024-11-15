import React, { useEffect, useState } from "react";
import "../styles/Celeb.css";
import CelebCardProps from "../types/Interface";
import { Link } from "react-router-dom";

const Card: React.FC<CelebCardProps> = (props) => {
  return (
    <div className="celeb-card">
      <Link to={"/"}>
        <div className="image-profile">
          <img src={props.image} alt="Celeb Image" />
        </div>
        <p className="celeb-name">{props.name}</p>
      </Link>
    </div>
  );
};

export default Card;
