import React from "react";
import { Col, Container, Row } from "react-bootstrap"; // Nhập Row và Col từ react-bootstrap
import GenresRating from "../../components/Admin/Dashboard/GenresRating";
import GenresRatio from "../../components/Admin/Dashboard/GenresRatio";
import MovieRatingPieChart from "../../components/Admin/Dashboard/MovieRatingPieChart";
import RateMovie from "../../components/Admin/Dashboard/RateMovie";
import RatingRatio from "../../components/Admin/Dashboard/RatingRatio";
import Statistic from "../../components/Admin/Dashboard/Statistic";
import UserCreate from "../../components/Admin/Dashboard/UserCreate";
import Navbar from "../../components/Admin/Navbar";
import Header from "../../components/Header";
import "../../styles/Dashboard.css";

const Dashboard: React.FC = () => {
    return (
        <Container fluid>
            <div>
                <Header />
            </div>
            <div style={{ marginTop: '70px' }}>
                <div className="navbar-container">
                    <Navbar />
                </div>
                <div className="statistic-container">
                    <h1 style={{ marginLeft: '160px' }}><strong>Dashboard</strong></h1>
                    <Statistic />
                    <Row className="mb-4"> {/* Thêm Row với khoảng cách dưới (margin-bottom) */}
                        <Col md={1}></Col>
                        <Col md={5}> {/* Cột cho UserCreate */}
                            <RateMovie />
                        </Col>
                        <Col md={1}></Col>
                        <Col md={4}> {/* Cột cho RatingRatio */}
                            <MovieRatingPieChart />
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                    <Row className="mb-4"> {/* Thêm Row với khoảng cách dưới (margin-bottom) */}
                        <Col md={1}></Col>
                        <Col md={5}> {/* Cột cho UserCreate */}
                            <UserCreate />
                        </Col>
                        <Col md={1}></Col>
                        <Col md={4}> {/* Cột cho RatingRatio */}
                            <RatingRatio />
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                    <GenresRatio />
                    <GenresRating />
                </div>
            </div>
        </Container>
    );
};

export default Dashboard;
