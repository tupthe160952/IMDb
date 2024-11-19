// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser  } from './UserContext'; // Import hook để lấy thông tin người dùng

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser (); // Lấy thông tin người dùng từ context

  // Kiểm tra xem người dùng có tồn tại và có vai trò admin không
  if (!user || user.role !== 'admin') {
    return <Navigate to="" />; 
  }

  return <>{children}</>; // Nếu là admin, hiển thị children (nội dung của route)
};

export default ProtectedRoute;