import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './.css';

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dien_thoai, setDienThoai] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleRegistration = () => {
        if (email === '' || password === '' || dien_thoai === '' || name === '') {
            alert('Vui lòng nhập đủ thông tin đăng ký');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Vui lòng nhập đúng định dạng email');
            return;
        }

        let url = 'http://localhost:3000/Register';
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, dien_thoai, name }),
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    alert('Lỗi đăng ký: ' + data.error);
                } else {
                    alert('Đăng ký thành công');
                    navigate('/login');
                }
            })
    };

    return (
        <div className="bg-full">
            <div className="form-signup">
                <form>
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            value={dien_thoai}
                            onChange={(e) => setDienThoai(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={handleRegistration}>
                        Register
                    </button>
                    <div className="login-link">
                        <p>Already have an account? <a href="/login">Log In</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;