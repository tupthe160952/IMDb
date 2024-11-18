import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Trailer: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Lấy movieId từ URL
    const [movie, setMovie] = useState<any>(null); // Lưu thông tin phim
    const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải dữ liệu

    useEffect(() => {
        axios
            .get(`http://localhost:9999/movie?id=${id}`) // Giả sử API sẽ trả về movie theo id
            .then((response) => {
                setMovie(response.data[0]); // Giả sử dữ liệu trả về là mảng và lấy phần tử đầu tiên
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

    // Chuyển đổi URL trailer từ watch?v= thành embed/
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
                            src={videoSrc} // Sử dụng URL video đã chuyển đổi
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