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
import { GenreDetail } from '../../../types/Interface';

const GenresRating: React.FC = () => {
    const [genres, setGenres] = useState<GenreDetail[]>([]);
    const [movies, setMovies] = useState<any[]>([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const genresResponse = await axios.get('http://localhost:9999/genres');
                setGenres(genresResponse.data);

                const moviesResponse = await axios.get('http://localhost:9999/movie');
                setMovies(moviesResponse.data);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };
        fetchData();
    }, []);

    const dataset = genres.map((genre) => {
        const relevantMovies = movies.filter(movie => movie.genres.includes(genre.id));

        const averageRating = relevantMovies.length > 0
            ? relevantMovies.reduce((sum, movie) => sum + movie.vote_average, 0) / relevantMovies.length
            : 0;

        return {
            name: genre.name,
            vote_average: averageRating,
        };
    });

    return (
        <Container>
            <Row className="my-4">
                <Col md={12}>
                    <h5>Genres Ratings Bar Chart</h5>
                    <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                        <ResponsiveContainer width="120%" height={400}>
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
                                    ticks={[0, 3, 6, 9, 10]}
                                />
                                <Tooltip />
                                <Legend
                                    layout="horizontal"
                                    verticalAlign="top"
                                    align="left"
                                />
                                <Bar dataKey="vote_average" fill="green" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default GenresRating;
