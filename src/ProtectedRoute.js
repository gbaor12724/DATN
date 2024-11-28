import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Để xử lý trạng thái tải lại
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/login');
    } else {
      setIsLoading(false); // Nếu đã đăng nhập, set lại isLoading
    }
  }, [isLoggedIn, navigate]);

  // Trả về null hoặc một trang loader cho đến khi xác thực xong
  if (isLoading) {
    return <div>Loading...</div>; // Có thể thay bằng một component loading
  }

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;
