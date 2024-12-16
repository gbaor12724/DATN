import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { themSP } from './cartSlice';
import { Link } from "react-router-dom";
import bannerImage1 from './images/b4.jpg';
import bannerImage2 from './images/b5.jpg';
import bannerImage3 from './images/b6.jpg';
import bannerImage4 from './images/b7.jpg';
import bannerImage5 from './images/b8.jpg';
import bannerImage6 from './images/b100.jpg';
import TopBrandsCarousel from "./TopBrandCarousel";
import './asests/css/Home.css';
import WatchKnowledge from "./WatchKnowledge";



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

    const banners = [bannerImage1, bannerImage2, bannerImage3, bannerImage4, bannerImage5, bannerImage6];

    const snowflakes = ['❄', '❅', '❆'];

    const christmasColors = {
        primary: '#C41E3A',      // Đỏ Giáng sinh
        secondary: '#165B33',    // Xanh lá thông
        gold: '#FFD700',        // Vàng ánh kim
        cream: '#F5F5F5',       // Kem nhẹ
        holly: '#146B3A',       // Xanh lá đậm
        burgundy: '#8B0000'     // Đỏ đậm
    };

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

    const nextBanner = () => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    };

    const prevBanner = () => {
        setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToBanner = (index) => {
        setCurrentBannerIndex(index);
    };

    useEffect(() => {
        const interval = setInterval(nextBanner, 5000); // Chuyển banner sau mỗi 5 giây
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const snow = document.getElementById('snow');
        
        const createSnowflake = () => {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
            snowflake.style.left = Math.random() * window.innerWidth + 'px';
            snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
            snowflake.style.opacity = Math.random();
            snowflake.style.fontSize = Math.random() * 20 + 10 + 'px';
            snowflake.style.color = Math.random() > 0.5 ? 'white' : christmasColors.gold;
            snowflake.style.textShadow = '2px 2px 4px rgba(255,255,255,0.5)';
            
            snow.appendChild(snowflake);
            
            setTimeout(() => {
                snowflake.remove();
            }, 5000);
        };

        const snowInterval = setInterval(createSnowflake, 100);

        return () => clearInterval(snowInterval);
    }, []);

    // Thêm useEffect cho nút scroll to top vào đây
    useEffect(() => {
        // Khi người dùng cuộn xuống 20px từ đầu trang, hiện nút
        const scrollFunction = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("myBtn").style.display = "block";
            } else {
                document.getElementById("myBtn").style.display = "none";
            }
        };

        window.addEventListener("scroll", scrollFunction);

        // Cleanup
        return () => window.removeEventListener("scroll", scrollFunction);
    }, []);

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

    // Thêm component Pagination riêng biệt
    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
        return (
            <div className="pagination-container">
                <button 
                    className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>

                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Hiển thị 3 trang trước và sau trang hiện tại
                    if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                    ) {
                        return (
                            <button
                                key={index}
                                className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    } else if (
                        pageNumber === currentPage - 3 ||
                        pageNumber === currentPage + 3
                    ) {
                        return <span key={index} className="pagination-ellipsis">...</span>;
                    }
                    return null;
                })}

                <button
                    className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        );
    };

    const headingStyle = {
        color: christmasColors.primary,
        textAlign: 'center',
        fontFamily: "'Dancing Script', cursive",
        fontSize: '2.5em',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
        margin: '30px 0'
    };

    const paginationStyle = {
        '.pagination-button': {
            backgroundColor: christmasColors.secondary,
            color: 'white',
            border: '1px solid ' + christmasColors.gold,
            margin: '0 5px',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            ':hover': {
                backgroundColor: christmasColors.holly,
                transform: 'scale(1.1)'
            }
        },
        '.pagination-button.active': {
            backgroundColor: christmasColors.primary,
            borderColor: christmasColors.gold
        }
    };

    const bannerStyle = {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '10px',
        border: '3px solid ' + christmasColors.gold,
        boxShadow: '0 0 20px rgba(255,215,0,0.3)',
        margin: '20px 0'
    };

    return (

        <div className="col-md-9 canhgiua">
            <div id="snow"></div>
            <div className="banner-container" style={{ marginBottom: '0', padding: '0' }}>
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className={`banner-slide ${index === currentBannerIndex ? 'active' : ''}`}
                    >
                        <img 
                            src={banner}
                            alt={`Banner ${index + 1}`}
                            loading="lazy"
                        />
                    </div>
                ))}
                <button className="banner-arrow prev" onClick={prevBanner}>
                    &#10094;
                </button>
                <button className="banner-arrow next" onClick={nextBanner}>
                    &#10095;
                </button>
                <div className="banner-controls">
                    {banners.map((_, index) => (
                        <div
                            key={index}
                            className={`banner-dot ${index === currentBannerIndex ? 'active' : ''}`}
                            onClick={() => goToBanner(index)}
                        />
                    ))}
                </div>
            </div>
            <h3 style={{ textAlign: 'center', paddingTop: '0', margin: '0' }}>ĐỒNG HỒ CHÍNH HÃNG CAO CẤP</h3>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Chúng tôi cam kết mang lại những giá trị cao nhất & đồng hồ chính hãng cho khách hàng khi đến với RX-Luxury
            </p>
            <div className="luxury-shopping-section">
                <div className="luxury-shopping-container">
                    <h1>Welcome to Luxury Shopping</h1>
                    <h2 className="top-brands-title"></h2>
                    <TopBrandsCarousel />
                </div>
            </div>
            <div>
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
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
            <div id="snow"></div>

            <div className="section-1">
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
                    <Pagination 
                        currentPage={currentPageNam}
                        totalPages={totalPagesNam}
                        onPageChange={setCurrentPageNam}
                    />
                </div>
            </div>
            <div className="video-section">
                <div className="container">
                    <div className="video-header">
                        <h3>Video Quảng Cáo Sản Phẩm</h3>
                    </div>
                    <div className="video-container">
                        <div className="video-wrapper">
                            <iframe
                                width="100%"
                                height="515"
                                src="https://www.youtube.com/embed/0reFCzSqBLk?si=YNo7Y_Ir6UZdYCcZ"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>



            <div className="section-2">
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
                    <Pagination 
                        currentPage={currentPageNu}
                        totalPages={totalPagesNu}
                        onPageChange={setCurrentPageNu}
                    />
                </div>
            </div>

            <div>
                <div className="home">
                    <WatchKnowledge />
                </div>
            </div>
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
