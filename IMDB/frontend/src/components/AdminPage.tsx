// AdminPage.tsx
import React from 'react';
import { useUser  } from './UserContext';

const AdminPage: React.FC = () => {
  const { user } = useUser ();

  if (!user || user.role !== 'admin') {
    return <div>You do not have permission to access this page.</div>; // Thông báo nếu không phải admin
  }

  return (
    <div>
      <h1>Welcome to the Admin Page, {user.name}!</h1>
      {/* Nội dung trang admin */}
    </div>
  );
};

export default AdminPage;