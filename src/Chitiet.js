import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './asests/css/style.css';
import { addToCart } from './cartSlice'; // Đảm bảo bạn đã import action này

function Chitiet() {
    const { id } = useParams();
    const dispatch = useDispatch(); // Khởi tạo dispatch
    const navigate = useNavigate(); // Khởi tạo navigate
    const [product, setProduct] = useState(null);
    const [slideIndex, setSlideIndex] = useState(1);
    const [timer, setTimer] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/donghonam/sanpham`);
                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();
                const productData = data.find(item => item.ma_san_pham === Number(id));
                setProduct(productData);
            } catch (error) {
                console.error("Error fetching product details:", error);
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
        setSlideIndex((prevIndex) => {
            const newIndex = prevIndex + n;
            return newIndex > 3 ? 1 : newIndex < 1 ? 3 : newIndex;
        });
    };

    const currentSlide = (n) => setSlideIndex(n);

    const handleAddToCart = () => {
        dispatch(addToCart(product)); // Gọi action thêm sản phẩm vào giỏ
        navigate('/cart'); // Chuyển hướng đến trang giỏ hàng
    };

    if (!product) {
        return <div>Đang tải...</div>;
    }

    return (
        <div>
            <div className="quay-lai">
                <div className="container">
                    <a href="../index.html" style={{ color: 'black' }}>
                        <i className="fas fa-home" style={{ fontSize: '30px' }}></i>
                        __3TWatch.com
                    </a>
                    <span style={{ fontSize: '14px' }}>&gt;</span>
                    <a href="../donghonu.html" style={{ color: 'black' }}>Nữ</a>
                    <span style={{ fontSize: '14px' }}>&gt;</span>
                    <a href="../dhoorient.html" style={{ color: 'black' }}>Đồng Hồ Orient</a>
                    <span style={{ fontSize: '14px' }}>&gt;</span>
                    <span>Orient FSZ3Z003W0 Nữ Quartz</span>
                </div>
            </div>
            <div className="container">
                <table width="100%" style={{ alignContent: 'center' }}>
                    <tbody>
                        <tr>
                            <td width="40%">
                                <div className="bg">
                                    <div className="slider-container">
                                        <div className="slider">
                                            {[1, 2, 3].map((index) => (
                                                <div key={index} className={`slide ${slideIndex === index ? "active" : ""}`}>
                                                    <img src={product.hinh} width="400" height="480" alt={product.ten_san_pham} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="navigation">
                                            <button className="prev" onClick={() => changeSlide(-1)}>&#10094;</button>
                                            <button className="next" onClick={() => changeSlide(1)}>&#10095;</button>
                                        </div>
                                        <div className="thumbnail-navigation">
                                            {[1, 2, 3].map((index) => (
                                                <div key={index} className={`thumbnail ${slideIndex === index ? "active" : ""}`} onClick={() => currentSlide(index)}>
                                                    <img src={`img${index}.jpg`} alt={`Thumbnail ${index}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td width="60%">
                                <h2 style={{ textAlign: 'center' }}><strong>{product.ten_san_pham}</strong></h2>
                                <h5 style={{ textAlign: 'center' }}>
                                    <strike>{product.Gia} VNĐ</strike>&ensp;
                                    <strong style={{ color: '#D57F00' }}>{product.gia_giam} VNĐ</strong>
                                </h5>
                                <div className="chi-tiet">
                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> Mua sản phẩm tại showroom của <strong>3TWatch.com</strong></p>
                                    <p><i className="fa fa-clock-o" aria-hidden="true"></i> Khuyến mãi kết thúc sau <strong>{`${timer.days} ngày ${timer.hours}:${timer.minutes}:${timer.seconds}`}</strong></p>
                                    <p><i className="fa fa-truck" aria-hidden="true"></i> Miễn phí vận chuyển trên toàn quốc</p>
                                    <p><i className="fa fa-heartbeat" aria-hidden="true"></i> Bảo hành chính hãng</p>
                                    <p><i className="fa fa-gift" aria-hidden="true"></i> Quà tặng hấp dẫn khi mua kèm sản phẩm</p>
                                    <p><i className="fa fa-refresh" aria-hidden="true"></i> Đổi hàng miễn phí trong 7 ngày khi chưa sử dụng</p>
                                </div>
                                <div className='tragop'>
                                    <button id="them-vao" onClick={handleAddToCart}>THÊM VÀO GIỎ</button>
                                    &ensp;
                                    <button>MUA NGAY</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="container">
                <div className="bg-table">
                    <table>
                        <tbody>
                            <tr>
                                <td width="5%"></td>
                                <td width="30%"><p><strong>Thông số kỹ thuật</strong></p></td>
                                <td width="30%"></td>
                                <td width="5%"></td>
                                <td width="40%"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="chi-tiet-1">
                                    <p><strong>Bảo hành chính hãng</strong></p>
                                    <p><strong>Chống nước</strong></p>
                                    <p><strong>Dạng mặt số</strong></p>
                                    <p><strong>Giới tính</strong></p>
                                    <p><strong>Loại dây</strong></p>
                                    <p><strong>Loại máy</strong></p>
                                    <p><strong>Size mặt số</strong></p>
                                    <p><strong>Thương hiệu</strong></p>
                                    <p><strong>Xuất xứ</strong></p>
                                </td>
                                <td className="chi-tiet-2">
                                    <p>{product.bao_hanh || 'Quốc tế 1 năm'}</p>
                                    <p>{product.chong_nuoc || '30m'}</p>
                                    <p>{product.dang_mat_so || 'Mặt tròn'}</p>
                                    <p>{product.gioi_tinh || 'Nữ'}</p>
                                    <p>{product.loai_day || 'Dây kim loại'}</p>
                                    <p>{product.loai_may || 'Quartz'}</p>
                                    <p>{product.size_mat_so || '30mm'}</p>
                                    <p>{product.thuong_hieu || 'Orient'}</p>
                                    <p>{product.xuat_xu || 'Nhật Bản'}</p>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Chitiet;
