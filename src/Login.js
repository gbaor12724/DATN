import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./authSlice"; // To dispatch login action
import "../src/login/css/login.css";

function Login() {
  const [vaitro, setVaitro] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Thêm state cho số điện thoại
  const [address, setAddress] = useState(""); // Thêm state cho địa chỉ
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        mat_khau: password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(login(user)); // Dispatch login action

      setVaitro(user.vaitro); // Set the role

    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (vaitro === "admin") {
      navigate("/dashboard");
    } else if (vaitro === "user") {
      navigate("/");
    }
  }, [vaitro, navigate]);

  // Register Handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset thông báo lỗi
  
    if (!fullName || !email || !password || !confirmPassword || !phoneNumber || !address) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }
  
    try {
      await axios.post("http://localhost:3000/api/register", {
        ten_nguoi_dung: fullName,
        email,
        mat_khau: password,
        vai_tro: "user", // Vai trò mặc định là user
        so_dien_thoai: phoneNumber,
        dia_chi: address,
      });
  
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      setIsRegistering(false); // Chuyển lại form đăng nhập
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
    }
  };
  

  return (
    <div className="login-container">
      <h1>CHÀO MỪNG BẠN ĐẾN 3TWATCH</h1>

      {!isRegistering ? (
        <div className="w3layoutscontaineragileits">
          <h2>ĐĂNG NHẬP</h2>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="MẬT KHẨU"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <ul className="agileinfotickwthree luumk">
              <li>
                <input type="checkbox" id="brand1" />
                <label htmlFor="brand1">Lưu mật khẩu</label>
              </li>
              <a href="#/">Quên mật khẩu?</a>
            </ul>
            <div className="aitssendbuttonw3ls">
              <button type="submit" className="submit-w3l">
                ĐĂNG NHẬP
              </button>
              <p>
                Tạo tài khoản mới <span>→</span>{" "}
                <a className="w3_play_icon1" onClick={() => setIsRegistering(true)} href="#small-dialog1">
                  Nhấn vào đây
                </a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        // Form đăng ký trong Login component
        <div className="w3layoutscontaineragileits">
          <h2>TẠO TÀI KHOẢN</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="HỌ VÀ TÊN"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="MẬT KHẨU"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="NHẬP LẠI MẬT KHẨU"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="SỐ ĐIỆN THOẠI"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="ĐỊA CHỈ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <div className="login-check">
              <input type="checkbox" id="brand1" />
              <label htmlFor="brand1">Tôi đồng ý với điều khoản</label>
            </div>

            <div className="aitssendbuttonw3ls">
              <button type="submit" className="submit-w3l">
                ĐĂNG KÝ
              </button>
              <p>
                Đã có tài khoản?{" "}
                <span>→</span>{" "}
                <a className="w3_play_icon1" onClick={() => setIsRegistering(false)} href="#small-dialog1">
                  Nhấn vào đây
                </a>
              </p>
            </div>
          </form>
        </div>

      )}
    </div>
  );
}

export default Login;
