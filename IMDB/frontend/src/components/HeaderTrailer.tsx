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
    const { id } = useParams<{ id: string }>();  // movieId
    const [movieData, setMovieData] = useState<any>(null);
    const { user } = useUser();  // Lấy thông tin người dùng
    const [userRating, setUserRating] = useState<number | null>(null);  // Lưu rating của user cho phim này
    const [userRatingId, setUserRatingId] = useState<string | null>(null);  // Lưu id của rating đã lưu trong database
    const [showRateModal, setShowRateModal] = useState(false);
    const [voteAverage, setVoteAverage] = useState<number>(0);
    const [voteCount, setVoteCount] = useState<number>(0);

    useEffect(() => {
        if (id && user) {
            console.log(`Fetching data for movie with id: ${id}`);

            axios
                .get(`http://localhost:9999/movie/${id}`)
                .then((response) => {
                    console.log("Movie data:", response.data);
                    setMovieData(response.data); // Update movie data
                    setVoteAverage(response.data.vote_average); // Set initial vote_average
                    setVoteCount(response.data.vote_count); // Set initial vote_count
                })
                .catch((error) => {
                    console.error("Error fetching movie data:", error);
                });

            // Fetch user rating for the current movie and user
            axios
                .get(`http://localhost:9999/ratings?movieId=${id}&userId=${user.id}`)
                .then((response) => {
                    // Tìm vị trí của rating có movieId khớp với id
                    const index = response.data.findIndex((rating: any) => rating.ratestar.movieId === id);

                    if (index !== -1) {
                        // Nếu tìm thấy rating, lấy ra rating tại vị trí tìm được
                        const existingRating = response.data[index];
                        setUserRating(existingRating.ratestar.rating);
                        setUserRatingId(existingRating.id);
                    } else {
                        // Nếu không tìm thấy rating, thiết lập lại giá trị
                        setUserRating(null);
                        setUserRatingId(null);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching ratings:", error);
                });
        }
    }, [id, user]);  // Chạy lại effect khi id hoặc user thay đổi

    if (!movieData) return <div>Loading...</div>;

    const year = movieData.date.split('/')[2];

    const handleRateStar = (rating: number) => {
        if (!user) {
            alert("Please log in to rate this movie.");
            return;
        }

        if (userRating !== null) {
            // Update existing rating
            axios
                .put(`http://localhost:9999/ratings/${userRatingId}`, {
                    userId: user.id,
                    ratestar: {
                        movieId: movieData.id,
                        rating: rating,
                    },
                })
                .then(() => {
                    setUserRating(rating);
                    alert("Your rating has been updated.");

                    // Fetch updated movie data and update average rating
                    axios
                        .get(`http://localhost:9999/movie/${movieData.id}`)
                        .then((response) => {
                            const movieData = response.data;
                            const { vote_average, vote_count } = movieData;

                            const newVoteAverage =
                                (vote_average * vote_count - userRating + rating) / vote_count;

                            const updatedMovieData = {
                                ...movieData,
                                vote_average: newVoteAverage,
                            };

                            // Update movie rating in the database
                            axios
                                .put(
                                    `http://localhost:9999/movie/${movieData.id}`,
                                    updatedMovieData
                                )
                                .then(() => {
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
            // Create a new rating
            axios
                .post("http://localhost:9999/ratings", {
                    userId: user.id,
                    ratestar: {
                        movieId: movieData.id,
                        rating: rating,
                    },
                })
                .then(() => {
                    setUserRating(rating);  // Lưu rating của user mới
                    alert("Thank you for your rating!");

                    // Fetch updated movie data and update average rating
                    axios
                        .get(`http://localhost:9999/movie/${movieData.id}`)
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

                            // Update movie rating in the database
                            axios
                                .put(
                                    `http://localhost:9999/movie/${movieData.id}`,
                                    updatedMovieData
                                )
                                .then(() => {
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
