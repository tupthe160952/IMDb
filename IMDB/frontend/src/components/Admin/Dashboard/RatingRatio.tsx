import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Màu sắc cho các phần của biểu đồ
const COLORS = ['#0088FE', '#FFBB28'];

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface Rating {
    userId: string;
    ratestar: {
        movieId: string;
        rating: number;
    };
    id: string;
}

const RatingRatio: React.FC = () => {
    const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get<User[]>('http://localhost:9999/users');
                const ratingsResponse = await axios.get<Rating[]>('http://localhost:9999/ratings');

                const users = usersResponse.data;
                const ratings = ratingsResponse.data;

                const totalUsers = users.length;
                const ratedUserIds = new Set(ratings.map(rating => rating.userId));
                const ratedUserCount = ratedUserIds.size;

                // Tính tỷ lệ phần trăm
                const ratedPercentage = (ratedUserCount / totalUsers) * 100;

                // Dữ liệu cho biểu đồ
                const data = [
                    { name: 'Người dùng đã đánh giá', value: ratedPercentage },
                    { name: 'Người dùng chưa đánh giá', value: 100 - ratedPercentage },
                ];

                setChartData(data);
                console.log('User Ratings Count:', { ratedUserCount, totalUsers, ratedPercentage });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container my-4">
            <h5 className="text-center">Percentage of users who rated the movie</h5>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {chartData.map((entry, index) => (
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

export default RatingRatio;
