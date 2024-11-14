
// export default LoginForm;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showRegisterLink, setShowRegisterLink] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Đăng nhập thành công:', data);
                setShowRegisterLink('true')
                localStorage.setItem('auth' , JSON.stringify(data.user))
                setTimeout(()=>{
                    window.location.href ='http://localhost:3001';
                },3000)
            } else {
                setError(data.message || 'Đăng nhập không thành công');
                setShowRegisterLink('false')
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi đăng nhập');
            setShowRegisterLink('false')
        }
    };
    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            // type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Sign In
                        </button>
                    </div>
                    {showRegisterLink === '' ? null : (
                showRegisterLink === 'true' ? (
                    <div className="mt-3 text-center text-success">
                        Đăng nhập thành công chuyển hướng sau 3s
                    </div>
                ) : (
                    <div className="mt-3 text-center text-danger">
                        {error}
                        <br />
                        <Link to="/register">Đăng ký tại đây</Link>
                    </div>
                )
            )}
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
