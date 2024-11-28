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

    // Function to get months up to the current month
    const getMonthsInYear = (currentMonth: number) => {
        const months = [];
        for (let i = 1; i <= currentMonth; i++) {
            months.push(`${i}/2024`); // Month format as "MM/YYYY"
        }
        return months;
    };

    // Fetch user data and calculate the registration statistics by month
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:9999/users');
            const users: User[] = await response.json();

            // Get current month (1 to 12)
            const currentMonth = new Date().getMonth() + 1;

            // Initialize months based on the current month
            const months = getMonthsInYear(currentMonth);

            // Initialize userStats for the months
            const userStats: UserStats[] = months.map((month) => ({
                month,
                userCount: 0,
            }));

            // Count users registered in each month
            users.forEach((user) => {
                const createdAt = new Date(user.createdAt);
                const month = `${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;

                // If the month is in the current range, increment the user count
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
                        ticks={[0, 10, 20, 30, 40, Math.max(...data.map(item => item.userCount))]} // Tính toán max userCount
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
