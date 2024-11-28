import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import './asests/css/user.css'; // Chắc chắn đã cập nhật đúng đường dẫn

function NguoiDungInfo() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Gọi API để lấy thông tin người dùng từ cơ sở dữ liệu
        fetchNguoiDung(parsedUser.id); // Truyền ID người dùng vào API
      } catch (e) {
        setError("Lỗi khi đọc thông tin người dùng.");
        localStorage.removeItem("user");
      }
    } else {
      navigate("/login"); // Redirect to login if no user data found
    }
  }, [navigate]);

  // Hàm gọi API để lấy thông tin người dùng từ backend
  const fetchNguoiDung = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/nguoi-dung/${userId}`);
      console.log(response.data); // Kiểm tra dữ liệu trả về từ API
      setUser(response.data); // Lưu dữ liệu vào state
    } catch (err) {
      setError("Lỗi khi lấy thông tin người dùng.");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Đang tải thông tin...</p>;
  }

  return (
    <div className="account-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <p>Xin chào, <strong>{user?.ten_nguoi_dung || "Khách"}</strong></p>
        </div>
        <div className="sidebar-item">
          <p><a href="/thong-tin-tai-khoan">Thông Tin Tài Khoản</a></p>
        </div>
        <div className="sidebar-item">
          <p><a href="/so-dia-chi">Sổ Địa Chỉ</a></p>
        </div>
        <div className="sidebar-item">
          <p><a href="/logout" onClick={() => localStorage.removeItem("user")}>Đăng Xuất</a></p>
        </div>
      </div>
      <div className="main-content">
        <h1>Thông Tin Người Dùng</h1>
        <div className="nguoi-dung-info">
          <p><strong>Họ và Tên:</strong> {user?.ten_nguoi_dung || "Chưa cập nhật"}</p>
          <p><strong>Email:</strong> {user?.email || "Chưa cập nhật"}</p>
          <p><strong>Vai Trò:</strong> {user?.vai_tro || "Chưa cập nhật"}</p>
          <p><strong>Số Điện Thoại:</strong> {user?.so_dien_thoai || "Chưa cập nhật"}</p>
          <p><strong>Địa Chỉ:</strong> {user?.dia_chi || "Chưa cập nhật"}</p>
        </div>
      </div>
    </div>
  );
}

export default NguoiDungInfo;
