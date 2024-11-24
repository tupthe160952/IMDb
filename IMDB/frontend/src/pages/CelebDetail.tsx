import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Celebs from '../types/Interface';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';

const CelebDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [celebs, setCelebs] = useState<Celebs | null>(null);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:9999/celebs/${id}`)
      .then((response) => setCelebs(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);



  if (!celebs) {
    return <div>Loading...</div>;
  }

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <div className='mb-5'>
        <Header />
      </div>
      <Container className="bg-white p-4 rounded shadow-sm" style={{ marginTop: "100px" }}>
        <Row className="align-items-start">
          <Col md={4}>
            <Image
              src={celebs.profile_path || 'default-image.jpg'}
              alt={celebs.name}
              className="img-fluid rounded mb-3"
              style={{ objectFit: 'cover', height: '400px' }}
            />
            <div className="mt-3">
              <h5>Personal Info</h5>
              <p><strong>Known For Department:</strong> {celebs.known_for_department}</p>
              <p><strong>Gender:</strong> {celebs.genders}</p>
              <p><strong>Birthday:</strong> {celebs.birthday || 'Unknown'}</p>
              <p><strong>Place of Birth:</strong> {celebs.place_of_birth || 'Unknown'}</p>
              <p><strong>Popularity:</strong> {celebs.popularity}</p>
            </div>
          </Col>
          <Col md={8}>
            <h1>{celebs.name}</h1>
            <h5>Biography</h5>
            <p>{showMore ? celebs.biography : `${celebs.biography.substring(0, 300)}...`}</p>
            <div className='float-end'>
              <a onClick={toggleShowMore} style={{ color: "#007bff", cursor: 'pointer', fontWeight: "bold" }}>
                {showMore ? 'Show Less' : 'Show More'}
              </a>
            </div>
            <h5 className="mt-5">Known For</h5>
            <Row className="d-flex flex-row overflow-auto">
              {celebs.known_for && celebs.known_for.map((movie, index) => (
                <Col key={index} className="mb-3" xs={6} sm={4} md={3} lg={2}>
                  <Image
                    src={movie.movie_image || 'default-movie.jpg'}
                    alt={movie.movie_name}
                    className="img-fluid rounded"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <p className="text-center mt-2">{movie.movie_name}</p>
                </Col>
              ))}
            </Row>

          </Col>
        </Row>
      </Container>
      <div className='mt-5'>
        <Footer />
      </div>
    </div>
  )
}
export default CelebDetail;
