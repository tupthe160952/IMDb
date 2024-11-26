import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Navbar from '../../components/Admin/Navbar';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string; // Thêm trường createdAt
    isActive: boolean; // Thêm trường isActive để theo dõi trạng thái tài khoản
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:9999/users');
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleDeactivate = async (id: number) => {
        // Cập nhật trạng thái tài khoản thành không hoạt động
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, isActive: false } : user
        );

        setUsers(updatedUsers);

        // Gửi yêu cầu cập nhật trạng thái tài khoản lên server
        await fetch(`http://localhost:9999/users/${id}`, {
            method: 'PATCH', // Sử dụng PATCH để cập nhật một phần của đối tượng
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isActive: false }),
        });
    };

    const handleActivate = async (id: number) => {
        // Cập nhật trạng thái tài khoản thành hoạt động
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, isActive: true } : user
        );

        setUsers(updatedUsers);

        // Gửi yêu cầu cập nhật trạng thái tài khoản lên server
        await fetch(`http://localhost:9999/users/${id}`, {
            method: 'PATCH', // Sử dụng PATCH để cập nhật một phần của đối tượng
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isActive: true }),
        });
    };

    return (
        <div className="container mt-5 ">
            <div className='list-user-container' style={{
                marginLeft:'90px'
            }}>
                <div className="navbar-container">
                    <Navbar />
                </div>
                <h2>User List</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter(user => user.role === 'user').map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.createdAt}</td>
                                <td>
                                    {user.isActive ? (
                                        <Button variant="warning" onClick={() => handleDeactivate(user.id)}>
                                            Deactivate
                                        </Button>
                                    ) : (
                                        <Button variant="success" onClick={() => handleActivate(user.id)}>
                                            Activate
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </div>
    );
};

export default UserList;