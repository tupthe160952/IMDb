import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Trailer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get(`http://localhost:9999/movie?id=${id}`)
            .then((response) => {
                setMovie(response.data[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movie data:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!movie) {
        return <div>Movie not found.</div>;
    }

    const videoSrc = movie.trailer.replace('watch?v=', 'embed/');

    return (
        <Container fluid>
            <Row>
                <Col>
                    <img
                        src={movie.thumbnail}
                        alt="Movie poster"
                        className="card-img-top"
                    />
                </Col>
                <Col xs={9}>
                    <div className="video-container" style={{ overflow: 'hidden', borderRadius: '15px' }}>
                        <iframe
                            width="100%"
                            height="600px"
                            src={videoSrc}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Trailer;
