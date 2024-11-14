import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from './images/logo.png';
import { Link } from 'react-router-dom'; // Import Link để sử dụng trong các liên kết

const Header = () => {
    const navigate = useNavigate(); // Khởi tạo useNavigate

    // Định nghĩa SearchForm bên ngoài Header
    const SearchForm = () => {
        const [searchTerm, setSearchTerm] = useState('');

        const handleSearch = (event) => {
            event.preventDefault(); // Ngăn chặn mặc định của form
            if (searchTerm.trim()) {
                navigate(`/search?query=${searchTerm}`); // Chuyển hướng đến trang tìm kiếm
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

    const handleCartClick = () => {
        navigate('/cart'); // Chuyển hướng đến trang giỏ hàng
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
                                <SearchForm /> {/* Sử dụng component SearchForm */}
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    style={{ borderColor: '#EEEEEE', backgroundColor: '#EEEEEE' }}
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    href="#/"
                                >
                                    THƯƠNG HIỆU <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="/sanpham?brand=0">Versace</a></li>
                                    <li><a href="/sanpham?brand=1">BVLGARI</a></li>
                                    <li><a href="/sanpham?brand=2">Omega</a></li>
                                    <li><a href="/sanpham?brand=3">Patek Philippe</a></li>
                                    <li><a href="/sanpham?brand=4">ROLEX</a></li>
                                    <li><a href="/sanpham?brand=5">Zenith</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/donghonam">NAM</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/donghonu">NỮ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">LIÊN HỆ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">ĐĂNG NHẬP</Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={handleCartClick} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#007bff' }}>
                                    GIỎ HÀNG
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
