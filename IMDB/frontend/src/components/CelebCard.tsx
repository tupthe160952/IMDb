import React from "react";
import "../styles/Celeb.css";
import { useNavigate } from 'react-router-dom';
import Celebs from '../types/Interface';

const Card: React.FC<Celebs> = ({
  id,
  name,
  profile_path,
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/celebs/${id}`);
  }
  return (
    <div className="celeb-card" style={{cursor: 'pointer'}} onClick={handleCardClick}>
      <div className="image-profile">
        <img src={profile_path} alt="Celeb Image" />
      </div>
      <p className="celeb-name">{name}</p>
    </div>
  );
};

export default Card;
