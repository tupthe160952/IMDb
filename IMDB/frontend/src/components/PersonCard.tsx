import React from 'react';
import Celebs from '../types/Interface';
import { useNavigate } from 'react-router-dom';
const PersonCard: React.FC<Celebs> = ({
    id,
    name,
    profile_path,
}) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/celebs/${id}`);
    };
    return (
        <div className="card mb-4" style={{ width: '18rem', cursor: 'pointer' }} onClick={handleCardClick}>
            <img
                src={profile_path}
                alt={name}
                className="card-img-top"
                style={{ objectFit: 'cover', height: '400px' }}
            />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>

            </div>
        </div>
    );
};

export default PersonCard;
