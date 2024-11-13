import React, { useEffect, useState } from 'react';
import Celebs from '../types/Interface';
import PersonCard from '../components/PersonCard';
import "../styles/PopularCeleb.css";

const PopularCeleb: React.FC = () => {
    const [celebrities, setCelebrities] = useState<Celebs[]>([]);
    useEffect(() => {
        // Fetch the data from the local JSON file or API
        fetch('http://localhost:9999/celebs')
            .then((response) => response.json())
            .then((data) => {
                // Sort the data by popularity in descending order
                const sortedData = data.sort((a: Celebs, b: Celebs) => b.popularity - a.popularity);
                setCelebrities(sortedData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <div className='m-4'>
                <h1 className="mb-4" style={{ color: "white", textAlign:"center" }}>Popular Celebrities</h1>
            </div>
            <div className="row">
                {celebrities.map((celeb) => (
                    <div className="celebCard " key={celeb.id}>
                        <PersonCard {...celeb} />
                    </div>
                ))}
            </div>
            
        </div>
    )
}
export default PopularCeleb;