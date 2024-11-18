import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import RateStar from "./RateStar";
import { useUser } from "./UserContext";

const HeaderTrailer: React.FC<any> = (props) => {
    const { id } = useParams<{ id: string }>();
    const [movieData, setMovieData] = useState<any>(null);
    const { user } = useUser();
    const [userRating, setUserRating] = useState<number | null>(null);
    const [userRatingId, setUserRatingId] = useState<number | null>(null);
    const [showRateModal, setShowRateModal] = useState(false);
    const [voteAverage, setVoteAverage] = useState<number>(0);
    const [voteCount, setVoteCount] = useState<number>(0);

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:9999/movie/${id}`)
                .then((response) => {
                    setMovieData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching movie data:", error);
                });
        }
    }, [id]);

    if (!movieData) return <div>Loading...</div>;

    const year = movieData.date.split('/')[2];

    const handleRateStar = (rating: number) => {
        if (!user) {
            alert("Please log in to rate this movie.");
            return;
        } else {
            if (userRating !== null) {
                axios
                    .put(`http://localhost:9999/ratings/${userRatingId}`, {
                        userId: user.id,
                        ratestar: {
                            movieId: props.id,
                            rating: rating,
                        },
                    })
                    .then(() => {
                        setUserRating(rating);
                        alert("Your rating has been updated.");

                        axios
                            .get(`http://localhost:9999/movie/${props.id}`)
                            .then((response) => {
                                const movieData = response.data;
                                const { vote_average, vote_count } = movieData;

                                // Tính lại điểm trung bình mà không thay đổi vote_count
                                const newVoteAverage =
                                    (vote_average * vote_count - userRating + rating) /
                                    vote_count;

                                // Cập nhật movieData với vote_average mới
                                const updatedMovieData = {
                                    ...movieData,
                                    vote_average: newVoteAverage,
                                };

                                axios
                                    .put(
                                        `http://localhost:9999/movie/${props.id}`,
                                        updatedMovieData
                                    )
                                    .then(() => {
                                        console.log("Movie rating updated successfully.");
                                        setVoteAverage(newVoteAverage);
                                    })
                                    .catch((error) => {
                                        console.error("Error updating movie data:", error);
                                    });
                            })
                            .catch((error) => {
                                console.error("Error fetching movie data:", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error updating rating:", error);
                    });
            } else {
                axios
                    .post("http://localhost:9999/ratings", {
                        userId: user.id,
                        ratestar: {
                            movieId: props.id,
                            rating: rating,
                        },
                    })
                    .then(() => {
                        setUserRating(rating);
                        alert("Thank you for your rating!");

                        axios
                            .get(`http://localhost:9999/movie/${props.id}`)
                            .then((response) => {
                                const movieData = response.data;
                                const { vote_average, vote_count } = movieData;

                                const newVoteCount = vote_count + 1;
                                const newVoteAverage =
                                    (vote_average * vote_count + rating) / newVoteCount;

                                const updatedMovieData = {
                                    ...movieData,
                                    vote_average: newVoteAverage,
                                    vote_count: newVoteCount,
                                };

                                axios
                                    .put(
                                        `http://localhost:9999/movie/${props.id}`,
                                        updatedMovieData
                                    )
                                    .then(() => {
                                        console.log("Movie rating updated successfully.");
                                        setVoteAverage(newVoteAverage);
                                        setVoteCount(newVoteCount);
                                    })
                                    .catch((error) => {
                                        console.error("Error updating movie data:", error);
                                    });
                            })
                            .catch((error) => {
                                console.error("Error fetching movie data:", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error submitting rating:", error);
                    });
            }
        }
    };

    const handleRateButtonClick = () => {
        setShowRateModal(true);
    };

    const handleCloseModal = () => {
        setShowRateModal(false);
    };

    return (
        <Container fluid style={{ color: 'white' }}>
            <Row className="py-4">
                <Col sm>
                    <h1>{movieData.title}</h1>
                    <h5>{movieData.title} · {year}</h5>
                </Col>
                <Col sm></Col>
                <Col sm>
                    <Row>
                        <Col>
                            <h5>IMDb RATING</h5>
                            <h3>
                                <i className="fas fa-star" style={{ color: '#5799ef' }}></i> {movieData.vote_average.toFixed(1)}/10
                            </h3>
                        </Col>
                        <Col>
                            <h5>YOUR RATING</h5>
                            <button
                                className="star-button"
                                aria-label="Rate this item"
                                onClick={handleRateButtonClick}
                            >
                                <h3>
                                    {userRating !== null ? (
                                        <i className="fas fa-star star-icon"></i>
                                    ) : (
                                        <i className="bi bi-star"></i>
                                    )}
                                    <span>
                                        {userRating !== null ? ` ${userRating}` : " Rate"}
                                    </span>
                                </h3>
                            </button>
                        </Col>
                        <Col>
                            <h5>POPULARITY</h5>
                            <h3>
                                <i className="bi bi-person" style={{ color: '#bebebd' }}></i> {movieData.popularity.toFixed(1)}
                            </h3>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* RateStar Modal */}
            <Modal show={showRateModal} onHide={handleCloseModal}>
                <Modal.Body className="custom-modal-content">
                    <RateStar
                        handleRateStar={handleRateStar}
                        currentRating={userRating}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default HeaderTrailer;
