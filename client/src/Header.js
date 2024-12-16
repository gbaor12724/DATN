import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from "./authSlice";
import { useSelector, useDispatch } from "react-redux";
import logo from './images/logo-luxury.png';
import './asests/css/Header.css'; // Đảm bảo đường dẫn đúng với tệp styles.css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Đảm bảo bạn đã import CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPhone, faUser, faHeart, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

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
            <form onSubmit={handleSearch} className="d-flex search-form">
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '0.9rem',
                        width: '200px'
                    }}
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
                <div className="container-fluid d-flex justify-content-start align-items-center">
                    <a className="navbar-brand" href="/">
                        <img
                            src={logo}
                            style={{
                                marginLeft: '20px',
                                width: '350px',
                                height: 'auto',
                                objectFit: 'contain',
                                display: 'block'
                            }}
                            alt="Logo"
                        />
                    </a>

                    <div className="search-form-container">
                        <SearchForm />
                    </div>

                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarResponsive">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto" style={{ gap: '5px' }}>
                            <li className="nav-item">
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
                                <div className="nav-icon-container">
                                    <Link className="nav-link" to="/contact">
                                        <FontAwesomeIcon icon={faPhone} />
                                        <span className="nav-icon-text">Liên hệ</span>
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-icon-container">
                                    <Link className="nav-link" to="/nguoidung">
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className="nav-icon-text">Thông tin</span>
                                    </Link>
                                </div>
                            </li>


                            <li className="nav-item">
                                <div className="nav-icon-container">
                                    <Link className="nav-link" to="/favorites">
                                        <FontAwesomeIcon icon={faHeart} />
                                        <span className="nav-icon-text">Yêu thích</span>
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-icon-container">
                                    <button
                                        onClick={handleCartClick}
                                        className="nav-link"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#007bff' }}
                                    >
                                        <FontAwesomeIcon icon={faCartShopping} />
                                        <span className="nav-icon-text">Giỏ hàng</span>
                                    </button>
                                </div>
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

                            {isLoggedIn ? (
                                <li className="nav-item">
                                    <div className="nav-icon-container">
                                        <button
                                            onClick={handleLogout}
                                            className="nav-link"
                                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            <span className="nav-icon-text">Đăng xuất</span>
                                        </button>
                                    </div>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <div className="nav-icon-container">
                                        <Link className="nav-link" to="/login">
                                            <FontAwesomeIcon icon={faSignInAlt} />
                                            <span className="nav-icon-text">Đăng nhập</span>
                                        </Link>
                                    </div>
                                </li>
                            )}
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
