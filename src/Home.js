import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { themSP } from './cartSlice';
import { Link } from "react-router-dom";
import bannerImage1 from './images/b4.jpg';
import bannerImage2 from './images/b5.jpg';
import bannerImage3 from './images/b6.jpg';
import bannerImage4 from './images/b7.jpg';
import bannerImage5 from './images/b8.jpg';
import './asests/css/Home.css';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import các icon cần dùng
function Home() {
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    
    const [listsp, setListSP] = useState([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // Quản lý số trang hiện tại
    const [currentPageNam, setCurrentPageNam] = useState(1); // Quản lý số trang cho Đồng Hồ Nam
    const [currentPageNu, setCurrentPageNu] = useState(1); // Quản lý số trang cho Đồng Hồ Nữ
    const productsPerPage = 8; // Số sản phẩm mỗi trang
    const dispatch = useDispatch();

    const banners = [bannerImage1, bannerImage2, bannerImage3];

    useEffect(() => {
        fetch("http://localhost:3000/donghonam/sanpham")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => setListSP(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex(prevIndex => (prevIndex + 1) % banners.length);
        }, 4000); // Thay đổi sau mỗi 5 giây

        return () => clearInterval(interval);
    }, [banners.length]);

    // Lọc sản phẩm nổi bật (Giá <= 8 triệu)
    const filteredProducts = listsp.filter(product => Number(product.Gia) <= 8000000);

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Tính tổng số trang cho Nam và Nữ
    const productsNam = listsp.filter(product => product.nam_nu === 'Nam');
    const productsNu = listsp.filter(product => product.nam_nu === 'Nữ');
    const totalPagesNam = Math.ceil(productsNam.length / productsPerPage);
    const totalPagesNu = Math.ceil(productsNu.length / productsPerPage);

    // Lấy sản phẩm hiển thị theo trang
    const displayedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );
    const displayedProductsNam = productsNam.slice(
        (currentPageNam - 1) * productsPerPage,
        currentPageNam * productsPerPage
    );
    const displayedProductsNu = productsNu.slice(
        (currentPageNu - 1) * productsPerPage,
        currentPageNu * productsPerPage
    );
    const addToFavorites = (product) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = favorites.some(item => item.ma_san_pham === product.ma_san_pham)
            ? favorites
            : [...favorites, product]; // Nếu sản phẩm đã có trong danh sách yêu thích thì không thêm nữa

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    const addCart = (newProduct) => {
        const cart = JSON.parse(localStorage.getItem('listCart')) || [];
        const updatedCart = cart.some(item => item.ma_san_pham === newProduct.ma_san_pham)
            ? cart.map(item =>
                item.ma_san_pham === newProduct.ma_san_pham
                    ? { ...item, so_luong: item.so_luong + 1 }
                    : item
            )
            : [...cart, { ...newProduct, so_luong: 1 }];

        localStorage.setItem('listCart', JSON.stringify(updatedCart));
    };

    const renderProducts = (products) => {
        return products.map((product, index) => (
            <div className="col-md-3 col-sm-12" key={index}>
                <div className="card product-item">
                    <Link to={`/chitiet/${product.ma_san_pham}`}>
                        <img className="card-img-top" src={product.hinh} alt={product.ten_san_pham} />
                    </Link>
                    <p className="product-name" style={{ textAlign: 'center' }}>
                        {truncateText(product.ten_san_pham, 100)}
                    </p>
                    <p className="product-price" style={{ textAlign: 'left' }}>
                       GIÁ GỐC: <span style={{ textDecoration: 'line-through', color: 'black' }}>
                            {Number(product.Gia).toLocaleString('vi-VN')} VNĐ
                        </span>
                        <br />
                        <span style={{ fontWeight: 'bold', color: 'red' }}>
                            GIÁ KHUYẾN MẠI : {Number(product.gia_giam).toLocaleString('vi-VN')} VNĐ
                        </span>
                    </p>
                    <p className="product-buttons" style={{ textAlign: 'center' }}>
                        <button onClick={() => addCart(product)} style={buttonStyle}>
                            <FaShoppingCart style={iconStyle} /> Giỏ hàng
                        </button>
                        <button onClick={() => addToFavorites(product)} style={buttonStyle}>
                            <FaHeart style={iconStyle} /> Yêu thích
                        </button>
                    </p>
                </div>
            </div>
        ));
    };

    return (

        <div className="col-md-9 canhgiua">
            <div className="banner-container">
                <img src={banners[currentBannerIndex]} width="2400" height="700" alt="Banner quảng cáo đồng hồ" class="img-fluid" loading="lazy" />

            </div>
            <h3 style={{ textAlign: 'center', paddingTop: '50px' }}>ĐỒNG HỒ CHÍNH HÃNG CAO CẤP</h3>
            <p style={{ textAlign: 'center' }}>
                Chúng tôi cam kết mang lại những giá trị cao nhất & đồng hồ chính hãng cho khách hàng khi đến với RX-Luxury
            </p>

            <section>
                <div className="container" style={{ maxWidth: '1264px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '50px' }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                        <h3>SẢN PHẨM NỔI BẬT</h3>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    </div>
                    <div className="bg" style={{ width: '1230px' }}>
                        <div className="row">
                            {renderProducts(displayedProducts)}
                        </div>
                    </div>
                    {/* Phân trang */}
                    <div className="pagination" style={{ textAlign: 'center', marginTop: '20px' }}>
                        {[...Array(totalPages)].map((_, pageIndex) => (
                            <button
                                key={pageIndex}
                                onClick={() => setCurrentPage(pageIndex + 1)}
                                style={{
                                    padding: '10px',
                                    margin: '0 5px',
                                    border: '1px solid #007BFF',
                                    backgroundColor: currentPage === pageIndex + 1 ? '#007BFF' : '#fff',
                                    color: currentPage === pageIndex + 1 ? '#fff' : '#007BFF',
                                    cursor: 'pointer',
                                }}
                            >
                                {pageIndex + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
            <div id="snow"></div>

            <section className="section-1">
                <div className="container" style={{ maxWidth: '1264px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '50px' }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                        <h3>ĐỒNG HỒ NAM</h3>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    </div>
                    <div className="bg" style={{ width: '1230px' }}>
                        <div className="row">
                            {renderProducts(displayedProductsNam)}
                        </div>
                    </div>
                    {/* Phân trang cho Đồng Hồ Nam */}
                    <div className="pagination" style={{ textAlign: 'center', marginTop: '20px' }}>
                        {[...Array(totalPagesNam)].map((_, pageIndex) => (
                            <button
                                key={pageIndex}
                                onClick={() => setCurrentPageNam(pageIndex + 1)}
                                style={{
                                    padding: '10px',
                                    margin: '0 5px',
                                    border: '1px solid #007BFF',
                                    backgroundColor: currentPageNam === pageIndex + 1 ? '#007BFF' : '#fff',
                                    color: currentPageNam === pageIndex + 1 ? '#fff' : '#007BFF',
                                    cursor: 'pointer',
                                }}
                            >
                                {pageIndex + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ padding: '50px 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ paddingBottom: '20px' }}>
                        <h3>Video Quảng Cáo Sản Phẩm</h3>
                    </div>
                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="480"
                            src="https://www.youtube.com/embed/mVzmIIlKmVM?si=3l8GVLs3bJ7zaVfM"
                            title="Advertisement Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>

            <section className="section-2">
                <div className="container" style={{ maxWidth: '1264px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '50px' }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                        <h3>ĐỒNG HỒ NỮ</h3>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    </div>
                    <div className="bg" style={{ width: '1230px' }}>
                        <div className="row">
                            {renderProducts(displayedProductsNu)}
                        </div>
                    </div>
                    {/* Phân trang cho Đồng Hồ Nữ */}
                    <div className="pagination" style={{ textAlign: 'center', marginTop: '20px' }}>
                        {[...Array(totalPagesNu)].map((_, pageIndex) => (
                            <button
                                key={pageIndex}
                                onClick={() => setCurrentPageNu(pageIndex + 1)}
                                style={{
                                    padding: '10px',
                                    margin: '0 5px',
                                    border: '1px solid #007BFF',
                                    backgroundColor: currentPageNu === pageIndex + 1 ? '#007BFF' : '#fff',
                                    color: currentPageNu === pageIndex + 1 ? '#fff' : '#007BFF',
                                    cursor: 'pointer',
                                }}
                            >
                                {pageIndex + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <button onClick={topFunction} id="myBtn" title="Go to top">^</button>
        </div>
    );
}
const buttonStyle = {
    padding: '8px 16px',
    margin: '5px',
    fontSize: '14px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#A0522D',
    color: 'white',
    cursor: 'pointer',
};

const iconStyle = {
    marginRight: '8px',
};
export default Home;
