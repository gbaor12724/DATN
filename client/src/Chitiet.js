import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { themSP } from './cartSlice';
import { useDispatch } from 'react-redux';
import './asests/css/style.css';
import { Link } from 'react-router-dom';
import baohanh from './images/baohanh.png';
import ReviewSection from './ReviewSection';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

function Chitiet() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]); // New state for products
    const [slideIndex, setSlideIndex] = useState(1);
    const [timer, setTimer] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
    const [error, setError] = useState(null); // Error handling state

    // Thêm useEffect để cuộn lên đầu trang
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [id]);

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/donghonam/sanpham`);
                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();
                const productData = data.find(item => item.ma_san_pham === Number(id));
                if (productData) {
                    setProduct(productData);
                } else {
                    setError("Product not found");
                }
                setProducts(data); // Store all products
            } catch (error) {
                console.error("Error fetching product details:", error);
                setError("Error fetching product details");
            }
        };
        fetchProduct();
    }, [id]);
    // Countdown Timer
    useEffect(() => {
        const countDownDate = new Date().setHours(23, 59, 59, 999);
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                setTimer({ days: "00", hours: "00", minutes: "00", seconds: "00" });
                return;
            }

            setTimer({
                days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
                hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
                minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
                seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')
            });
        };

        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    // Slider Functions
    const changeSlide = (n) => {
        setSlideIndex(prevIndex => {
            const newIndex = prevIndex + n;
            return newIndex > 3 ? 1 : newIndex < 1 ? 3 : newIndex;
        });
    };
    const currentSlide = (n) => setSlideIndex(n);

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Đang tải...</div>;
    }

    const displayedProducts = products.slice(0, 4);
    const truncateText = (text, length) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };
    const addToFavorites = (product) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = favorites.some(item => item.ma_san_pham === product.ma_san_pham)
            ? favorites
            : [...favorites, product]; // Nếu sản phẩm đã có trong danh sách yêu thích th�� không thêm nữa

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
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
    return (

        <>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                <div className="product-navigation" style={{ marginBottom: '20px' }}>
                    <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
                        Trang chủ
                    </Link>
                    {' > '}
                    <span>Chi tiết sản phẩm</span>
                </div>

                <div style={{ display: 'flex', gap: '40px' }}>
                    {/* Left side - Product Images */}
                    <div style={{ flex: '1' }}>
                        {/* Main product image */}
                        <div className="main-image" style={{ 
                            marginBottom: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            border: '1px solid #eee',
                            padding: '20px',
                            borderRadius: '4px'
                        }}>
                            <img 
                                src={product.hinh} 
                                alt={product.ten_san_pham}
                                style={{ 
                                    width: 'auto',
                                    height: 'auto',
                                    maxWidth: '100%',
                                    maxHeight: '500px',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>

                        {/* Thumbnail images */}
                        <div style={{ 
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'center'
                        }}>
                            {[product.hinh, product.hinh2].map((img, index) => (
                                <div 
                                    key={index}
                                    style={{ 
                                        width: '80px',
                                        height: '80px',
                                        border: slideIndex === index + 1 ? '2px solid #b39964' : '1px solid #ddd',
                                        cursor: 'pointer',
                                        padding: '5px',
                                        backgroundColor: '#fff',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => currentSlide(index + 1)}
                                >
                                    <img 
                                        src={img} 
                                        alt={`Thumbnail ${index + 1}`}
                                        style={{ 
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Product Details */}
                    <div style={{ flex: '1' }}>
                        <h1 style={{ fontSize: '24px', marginBottom: '15px' }}>{product.ten_san_pham}</h1>
                        <div style={{ marginBottom: '20px' }}>
                            <p>MSP: {product.ma_san_pham}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {/* Add your rating stars here */}
                                <span>Chưa có đánh giá</span>
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <p style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>
                                {Number(product.gia_giam).toLocaleString('vi-VN')} VNĐ
                            </p>
                            <p style={{ textDecoration: 'line-through' }}>
                                {Number(product.Gia).toLocaleString('vi-VN')} VNĐ
                            </p>
                        </div>

                        <button 
                            style={{
                                width: '100%',
                                padding: '15px',
                                backgroundColor: '#b39964',
                                color: 'white',
                                border: 'none',
                                marginBottom: '10px',
                                cursor: 'pointer'
                            }}
                            onClick={() => addCart(product)}
                        >
                            ĐẶT HÀNG
                        </button>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <button 
                                style={{
                                    flex: 1,
                                    padding: '15px',
                                    backgroundColor: '#333',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                THANH TOÁN ONLINE
                            </button>
                            <button 
                                style={{
                                    flex: 1,
                                    padding: '15px',
                                    backgroundColor: '#333',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                TRẢ GÓP 0%
                            </button>
                        </div>

                        <div style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
                            <h3>Quý khách cần hỗ trợ?</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li>• Sản phẩm nhập khẩu chính hãng</li>
                                <li>• Vận chuyển miễn phí toàn quốc</li>
                                <li>• Giao hàng trong ngày</li>
                                <li>• Thanh toán sau khi nhận hàng</li>
                                <li>• Bảo hành 5 năm tại Công ty</li>
                                <li>• Bảo hành 2 năm chính hãng toàn cầu</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '1200px', margin: '40px auto' }}>
                {/* Phần Giới thiệu */}
                <div className="product-section">
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        textAlign: 'center', 
                        marginBottom: '20px' 
                    }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                        <h3>GIỚI THIỆU</h3>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    </div>
                    <div style={{ 
                        backgroundColor: '#f9f9f9', 
                        padding: '20px', 
                        borderRadius: '4px',
                        marginBottom: '40px'
                    }}>
                        <p style={{ lineHeight: '1.6' }}>{product.mo_ta}</p>
                    </div>
                </div>

                {/* Phần Thông số */}
                <div className="specifications-section">
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        textAlign: 'center', 
                        marginBottom: '20px' 
                    }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                        <h3>THÔNG SỐ</h3>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '20px',
                        backgroundColor: '#f9f9f9',
                        padding: '20px',
                        borderRadius: '4px'
                    }}>
                        <div className="spec-item" style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                            <span style={{ flex: '1', fontWeight: 'bold' }}>Thương hiệu:</span>
                            <span style={{ flex: '2' }}>{product.thuong_hieu}</span>
                        </div>
                        <div className="spec-item" style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                            <span style={{ flex: '1', fontWeight: 'bold' }}>Bộ sưu tập:</span>
                            <span style={{ flex: '2' }}>{product.bo_suu_tap}</span>
                        </div>
                        <div className="spec-item" style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                            <span style={{ flex: '1', fontWeight: 'bold' }}>SKU:</span>
                            <span style={{ flex: '2' }}>{product.sku}</span>
                        </div>
                        <div className="spec-item" style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                            <span style={{ flex: '1', fontWeight: 'bold' }}>Mã sản phẩm:</span>
                            <span style={{ flex: '2' }}>{product.ma_san_pham}</span>
                        </div>
                        <div className="spec-item" style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                            <span style={{ flex: '1', fontWeight: 'bold' }}>Giới tính:</span>
                            <span style={{ flex: '2' }}>{product.nam_nu}</span>
                        </div>
                        <div className="spec-item" style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                            <span style={{ flex: '1', fontWeight: 'bold' }}>Loại máy:</span>
                            <span style={{ flex: '2' }}>{product.loai_may}</span>
                        </div>
                        <div className="spec-item" style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                            <span style={{ flex: '1', fontWeight: 'bold' }}>Đường kính:</span>
                            <span style={{ flex: '2' }}>{product.duong_kinh}</span>
                        </div>
                        <div className="spec-item" style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '10px 0' }}>
                            <span style={{ flex: '1', fontWeight: 'bold' }}>Độ chịu nước:</span>
                            <span style={{ flex: '2' }}>{product.do_chiu_nuoc}</span>
                        </div>
                    </div>
                </div>
            </div>

            <ReviewSection productId={id} />

            <div className="container" style={{ maxWidth: '1264px', margin: '40px auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '50px' }}>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    <h3>SẢN PHẨM LIÊN QUAN</h3>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                </div>
                
                <div className="bg" style={{ width: '1230px' }}>
                    <div className="row">
                        {displayedProducts.map((product, index) => (
                            <div className="col-md-3 col-sm-12" key={index}>
                                <div className="card product-item">
                                    <Link to={`/chitiet/${product.ma_san_pham}`}>
                                        <img 
                                            className="card-img-top" 
                                            src={product.hinh} 
                                            alt={product.ten_san_pham} 
                                        />
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
                                            GIÁ KHUYẾN MẠI: {Number(product.gia_giam).toLocaleString('vi-VN')} VNĐ
                                        </span>
                                    </p>
                                    <p className="product-buttons" style={{ textAlign: 'center' }}>
                                        <button 
                                            onClick={() => addCart(product)} 
                                            style={{
                                                padding: '8px 16px',
                                                margin: '5px',
                                                fontSize: '14px',
                                                borderRadius: '4px',
                                                border: 'none',
                                                backgroundColor: '#A0522D',
                                                color: 'white',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <FaShoppingCart style={{ marginRight: '8px' }} /> Giỏ hàng
                                        </button>
                                        <button 
                                            onClick={() => addToFavorites(product)}
                                            style={{
                                                padding: '8px 16px',
                                                margin: '5px',
                                                fontSize: '14px',
                                                borderRadius: '4px',
                                                border: 'none',
                                                backgroundColor: '#A0522D',
                                                color: 'white',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <FaHeart style={{ marginRight: '8px' }} /> Yêu thích
                                        </button>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
              {/* Thêm logic phân trang ở đây */}
            </div>
        </>
    );
    
}

export default Chitiet;
