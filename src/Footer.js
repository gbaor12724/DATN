import React from 'react';
import logo from './images/logo-luxury.png';
import './asests/css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="footer-info">
                    <div className="footer-info-section">
                        <h3>Thông tin liên hệ</h3>
                        <p>Tòa nhà QTSC9 (toà T), đường Tô Ký, phường Tân Chánh Hiệp, quận 12, TP HCM.</p>
                        <p>Fax: 0272.123.121</p>
                        <p>SĐT: 028.6686.6486</p>
                        <p>Email: FPT@gmail.com</p>
                    </div>
                    <div className="footer-info-section">
                        <h3>Tổng đài</h3>
                        <p><a href="index.html">1800 0999</a></p>
                        <p><a href="donghonam.html">Feedbacks</a></p>
                        <p><a href="donghonu.html">0868855855</a></p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Luxury Shopping. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
