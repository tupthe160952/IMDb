import React, { useEffect, useState } from 'react';
import Celebs from '../types/Interface';
import PersonCard from '../components/PersonCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination } from 'react-bootstrap';
import "../styles/Pagination.css"
import Header from "../components/Header";
import Footer from "../components/Footer";

const PopularCeleb: React.FC = () => {
    const [celebrities, setCelebrities] = useState<Celebs[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [celebritiesPerPage] = useState<number>(8); // Number of celebrities per page

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

    const indexOfLastCeleb = currentPage * celebritiesPerPage;
    const indexOfFirstCeleb = indexOfLastCeleb - celebritiesPerPage;
    const currentCelebrities = celebrities.slice(indexOfFirstCeleb, indexOfLastCeleb);

    // Handle page change
    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calculate total number of pages
    const totalPages = Math.ceil(celebrities.length / celebritiesPerPage);

    return (
        <div>
            <div className='mb-5'>
                <Header />
            </div>
            <div className="container mt-5">
                <div className="text-center mb-4" >
                    <h1 className="text-black" style={{ marginTop: "90px", marginBottom: "50px" }}>Popular Celebrities</h1>
                </div>
                <div className="row row-cols-1 row-cols-md-4 g-5">
                    {currentCelebrities.map((celeb) => (
                        <div className="col" key={celeb.id}>
                            <PersonCard {...celeb} />
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="d-flex justify-content-center mt-4 mx-2 mb-4">
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
export default PopularCeleb;