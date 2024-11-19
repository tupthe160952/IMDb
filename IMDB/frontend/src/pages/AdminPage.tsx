// AdminPage.tsx
import React from 'react';
import { useUser } from '../components/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Admin/Navbar';
const AdminPage: React.FC = () => {
  const { user } = useUser();

  if (!user || user.role !== 'admin') {
    return <div>You do not have permission to access this page.</div>; // Thông báo nếu không phải admin
  }

  return (
    <div>
      <Navbar/>
      
    </div>
  );
};

export default AdminPage;