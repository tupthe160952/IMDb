import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Định nghĩa kiểu cho dữ liệu phim
interface Movie {
    id: number;
    title: string;
    vote_average: number;
}

const MovieRatingPieChart = () => {
    const [movies, setMovies] = useState<Movie[]>([]); // Chỉ định kiểu cho state

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('http://localhost:9999/movie');
            const data: Movie[] = await response.json(); // Chỉ định kiểu cho dữ liệu nhận được
            setMovies(data);
        };

        fetchMovies();
    }, []);

    const categorizeMovies = (movies: Movie[]) => { // Chỉ định kiểu cho tham số
        const categories: { [key: string]: number } = {
            'Bad Movie': 0,
            'Fair Movie': 0,
            'Good Movie': 0,
            'Super Movie': 0,
        };

        movies.forEach((movie: Movie) => { // Chỉ định kiểu cho tham số
            const rating = movie.vote_average;
            if (rating >= 0 && rating < 3) {
                categories['Bad Movie']++;
            } else if (rating >= 3 && rating < 6) {
                categories['Fair Movie']++;
            } else if (rating >= 6 && rating < 9) {
                categories['Good Movie']++;
            } else if (rating >= 9 && rating <= 10) {
                categories['Super Movie']++;
            }
        });

        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    };

    const data = categorizeMovies(movies);
    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

    return (
        <div className="container mt-5">
            <h5 className="text-center">Movie Ratings Distribution</h5>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default MovieRatingPieChart;
