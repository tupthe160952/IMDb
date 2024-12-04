import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { User } from '../../../types/Interface';

interface UserStats {
    month: string;
    userCount: number;
}

const UserCreate: React.FC = () => {
    const [data, setData] = useState<UserStats[]>([]);

    const getMonthsInYear = (currentMonth: number) => {
        const months = [];
        for (let i = 1; i <= currentMonth; i++) {
            months.push(`${i}/2024`);
        }
        return months;
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:9999/users');
            const users: User[] = await response.json();

            const currentMonth = new Date().getMonth() + 1;

            const months = getMonthsInYear(currentMonth);

            const userStats: UserStats[] = months.map((month) => ({
                month,
                userCount: 0,
            }));

            users.forEach((user) => {
                const createdAt = new Date(user.createdAt);
                const month = `${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;

                if (months.includes(month)) {
                    const existingMonth = userStats.find((stat) => stat.month === month);
                    if (existingMonth) {
                        existingMonth.userCount += 1;
                    }
                }
            });

            setData(userStats);
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mt-4">
            <h5 className="mb-4">User Registration Statistics</h5>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                        ticks={[0, 10, 20, 30, 40, Math.max(...data.map(item => item.userCount))]} 
                    />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="userCount" stroke="#8884d8" connectNulls={true} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserCreate;
