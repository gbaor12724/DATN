import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from "./authSlice";
import { useSelector, useDispatch } from "react-redux";
import logo from './images/logo-luxury.png';
import './asests/css/Header.css'; // Đảm bảo đường dẫn đúng với tệp styles.css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Đảm bảo bạn đã import CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy thông tin đăng nhập từ Redux
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);  // Giả sử user sẽ chứa thông tin của người dùng sau khi đăng nhập

    // Hàm đăng xuất
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Hiển thị thông báo khi đăng xuất thành công
        toast.success('Đăng xuất thành công!', {
            position: 'top-center',
            autoClose: 3000,
            onClose: () => navigate('/login')
        });
    };


    // Hàm chuyển chế độ tối sáng
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // Tạo form tìm kiếm
    const SearchForm = () => {
        const [searchTerm, setSearchTerm] = useState('');

        const handleSearch = (event) => {
            event.preventDefault();
            if (searchTerm.trim()) {
                navigate(`/search?query=${searchTerm}`);
            } else {
                alert('Vui lòng nhập từ khóa tìm kiếm');
            }
        };

        return (
            <form onSubmit={handleSearch} className="d-flex">
                <input
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" className="btn btn-primary" style={{ marginLeft: '10px' }}>
                    <i className="fas fa-search"></i>
                </button>
            </form>
        );
    };

    // Lắng nghe thay đổi chế độ tối
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} width="150px" height="90px" style={{ marginLeft: '100px' }} alt="Logo" />
                    </a>

                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarResponsive">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <SearchForm />
                            </li>
                            <li>
                                <div className="dropdown">
                                    <a style={{ borderColor: '#EEEEEE', backgroundColor: '#EEEEEE' }}
                                        className="dropdown-toggle" data-toggle="dropdown" href="#/">
                                        THƯƠNG HIỆU
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="/seiko">Seiko</a></li>
                                        <li><a href="/versace">Versace</a></li>
                                        <li><a href="/omega">Omega</a></li>
                                        <li><a href="/rolex">Rolex</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/donghonam">NAM</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/donghonu">NỮ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contact">
                                    <i className="fa-solid fa-phone" style={{ marginRight: '8px' }}></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/nguoidung">
                                    <i className="fa-solid fa-user" style={{ marginRight: '8px' }}></i>
                                    Thông tin
                                </Link>
                            </li>


                            {isLoggedIn ? (
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-danger nav-link"
                                        onClick={handleLogout}
                                    >
                                        Đăng Xuất
                                    </button>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">
                                        Đăng Nhập
                                    </a>
                                </li>
                            )}
                            <li className="nav-item">
                                <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#007bff' }}>
                                    <Link to="/favorites" style={{ textDecoration: 'none', color: '#007bff' }}>
                                        DANH SÁCH YÊU THÍCH
                                    </Link>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    onClick={handleCartClick}
                                    className="nav-link"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#007bff', display: 'flex', alignItems: 'center', gap: '5px' }}
                                >
                                    <FontAwesomeIcon icon={faCartShopping} style={{ marginRight: '5px' }} />
                                    GIỎ HÀNG
                                </button>
                            </li>

                            <li className="nav-item">
                                <button onClick={toggleDarkMode} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} >
                                    {isDarkMode ? (
                                        <i className="fas fa-sun"></i>
                                    ) : (
                                        <i className="fas fa-moon"></i>
                                    )}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Thêm ToastContainer vào cuối component */}
            <ToastContainer />
        </header>
    );
};

export default Header;
