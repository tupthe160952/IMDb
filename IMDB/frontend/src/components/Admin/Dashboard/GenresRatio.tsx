import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Màu sắc cho các phần của biểu đồ
const COLORS = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
    '#FF5733', '#C70039', '#581845', '#900C3F', '#FFC300', '#DAF7A6',
    '#FFB6C1', '#FFD700', '#6A5ACD', '#20B2AA', '#FF4500', '#1E90FF',
    '#FF1493', '#7FFF00'
];

interface Genre {
    id: number;
    name: string;
}

interface Movie {
    id: number;
    title: string;
    genres: number[];
}

interface GenreData {
    name: string;
    count: number;
}

const GenresRatio: React.FC = () => {
    const [genresData, setGenresData] = useState<GenreData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const genresResponse = await axios.get<Genre[]>('http://localhost:9999/genres');
                const moviesResponse = await axios.get<Movie[]>('http://localhost:9999/movie');

                const genres = genresResponse.data;
                const movies = moviesResponse.data;

                const data = genres.map((genre) => {
                    const count = movies.filter((movie) => movie.genres.includes(genre.id)).length; 
                    return { name: genre.name, count };
                });

                const completeData = genres.map((genre) => {
                    const count = data.find(d => d.name === genre.name)?.count || 0;
                    return { name: genre.name, count };
                });

                console.log('Genres Data:', completeData);
                setGenresData(completeData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container my-4">
            <h5 className="text-center">Ratio of movie types</h5>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={genresData}
                                dataKey="count"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {genresData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number, name: string) => [value, name]} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default GenresRatio;
