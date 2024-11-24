// AdminPage.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Navbar from '../components/Admin/Navbar';
import { useUser } from '../components/UserContext';
import MovieList from './admin/ListMovie';
const AdminPage: React.FC = () => {
  const { user } = useUser();

  if (!user || user.role !== 'admin') {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div>
      <Navbar/>
      <MovieList />
    </div>
  );
};

export default AdminPage;