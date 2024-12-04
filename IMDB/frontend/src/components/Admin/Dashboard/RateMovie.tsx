import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { Movie } from '../../../types/Interface';



const RateMovie: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        axios.get('http://localhost:9999/movie')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the movie data!', error);
            });
    }, []);

    const dataset = movies.map((movie) => ({
        name: movie.title,
        vote_average: parseFloat(movie.vote_average.toFixed(2)),
    }));

    return (
        <Container>
            <Row className="my-4">
                <Col md={12}>
                    <h5>Movie Ratings Bar Chart</h5>
                    <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                        <ResponsiveContainer width="500%" height={400}>
                            <BarChart
                                data={dataset}
                                margin={{ top: 20, right: 30, bottom: 90, left: 40 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 10 }}
                                    angle={-25}
                                    textAnchor="end"
                                />
                                <YAxis
                                    ticks={[0, 2.5, 5, 7.5, 10]}
                                />
                                <Tooltip />
                                <Legend
                                    layout="horizontal"
                                    verticalAlign="top"
                                    align="left"
                                />
                                <Bar dataKey="vote_average" fill="blue" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RateMovie;
