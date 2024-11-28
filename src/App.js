import '@fortawesome/fontawesome-free/css/all.min.css';
import './asests/css/style.css';
import './asests/js/javascript.js';
import Versace from './Versace';
import Seiko from './seiko';
import Omega from './omega.js';
import Rolex from './rolex.js';
import { useLocation } from "react-router-dom";

import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Chitiet from './Chitiet.js';
import ShowCart from './ShowCart';
import SanPhamTheoThuongHieu from './SanPhamTheoThuongHieu';
import DongHoNu from './DongHoNu';
import DongHoNam from './DongHoNam';
import Contact from './Contact';
import Thanhtoan from './Thanhtoan';
import SearchPage from './SearchPage';
import NguoiDungInfo from './NguoiDungInfo';

// admin //
import LayoutADMIN from './admin/component/LayoutADMIN.js';

import { Routes, Route } from "react-router-dom";
import NguoiDung from './admin/component/NguoiDung.js';

// login
import Login from './Login';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';
import ShowFavorites from './ShowFavorites';
import Dashboad from './admin/component/LayoutADMIN.js';

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    // Lấy thông tin người dùng từ localStorage khi ứng dụng khởi động
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            try {
                const parsedUser = JSON.parse(user);
                dispatch(login({ user: parsedUser, token }));
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
    }, [dispatch]);

    const [routeADMIN, setRouteADMIN] = useState([
        '/dashboard',
        '/product',
        '/product/add',
        '/thuonghieu',
        '/thuonghieu/add',
        '/thuonghieu/edit/:id',
        '/nguoi-dung',
    ]);

    return (
        <>
            {!routeADMIN.includes(location.pathname) && <Header />}
            <nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/showcart/" element={<ShowCart />} />
                    <Route path="/chitiet/:id" element={<Chitiet />} />
                    <Route path="/donghonam" element={<DongHoNam />} />
                    <Route path="/donghonu" element={<DongHoNu />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/sanpham" element={<SanPhamTheoThuongHieu />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/cart" element={<ShowCart />} />
                    <Route path="/versace" element={<Versace />} />
                    <Route path="/seiko" element={<Seiko />} />
                    <Route path="/omega" element={<Omega />} />
                    <Route path="/rolex" element={<Rolex />} />
                    <Route path="/favorites" element={<ShowFavorites />} />
                    <Route path="/nguoidung" element={<NguoiDungInfo />} />

                    {/* Chỉ cho phép truy cập thanh toán nếu đã đăng nhập */}
                    <Route
                        path="/thanhtoan"
                        element={
                            <ProtectedRoute>
                                <Thanhtoan />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Routes */}
                    <Route path="/dashboard" element={<LayoutADMIN />} />
                    <Route path="/product" element={<LayoutADMIN />} />
                    <Route path="/product/add" element={<LayoutADMIN />} />
                    <Route path="/thuonghieu" element={<LayoutADMIN />} />
                    <Route path="/thuonghieu/add" element={<LayoutADMIN />} />
                    <Route path="/thuonghieu/edit/:id" element={<LayoutADMIN />} />
                    <Route path="/nguoi-dung" element={<NguoiDung />} />

                    {/* Login */}
                    <Route path="/login" element={<Login />} />
                </Routes>
            </nav>
            {!routeADMIN.includes(location.pathname) && <Footer />}
        </>
    );
}

export default App;
