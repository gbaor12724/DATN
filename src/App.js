import Home from './Home';
import Header from './Header';
import Footer from './Footerr';
import './asests/css/style.css';
import './asests/js/javascript.js';
import Chitiet from './Chitiet';
import ShowCart from './ShowCart';
import SanPhamTheoThuongHieu from './SanPhamTheoThuongHieu';
import DongHoNu from './DongHoNu';
import DongHoNam from './DongHoNam';
import Contact from './Contact';
import LoginForm from './LoginForm';
import SearchPage from './SearchPage'; // Import trang tìm kiếm
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Header />

            <nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/showcart" element={<ShowCart />} /> {/* Đường dẫn đến giỏ hàng */}
                    <Route path="/chitiet/:id" element={<Chitiet />} />
                    <Route path="/donghonam" element={<DongHoNam />} />
                    <Route path="/donghonu" element={<DongHoNu />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/sanpham" element={<SanPhamTheoThuongHieu />} />
                    <Route path="/loginform" element={<LoginForm />} />
                    <Route path="/search" element={<SearchPage />} /> {/* Thêm route cho trang tìm kiếm */}
                    
                </Routes>
            </nav>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
