import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { themSP } from './cartSlice'; 
import { useNavigate } from 'react-router-dom'; // Nhập useNavigate để điều hướng
import './DongHoNu.css'; 

function DongHoNu() {
    const [listsp, setListSP] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/donghonam/sanpham"); 
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const filteredProducts = data.filter(product => product.nam_nu === 'Nữ');
                setListSP(filteredProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProducts();
    }, []);

    const displayedProducts = showAll ? listsp : listsp.slice(0, 12);

    const handleAddToCart = (product) => {
        dispatch(themSP({ ...product, so_luong: 1 })); // Thêm sản phẩm vào giỏ hàng
        alert(`${product.ten_san_pham} đã được thêm vào giỏ hàng!`); // Thông báo cho người dùng
    };

    const handleBuyNow = (product) => {
        dispatch(themSP({ ...product, so_luong: 1 })); // Thêm sản phẩm vào giỏ hàng
        alert(`${product.ten_san_pham} đã được thêm vào giỏ hàng!`); // Thông báo cho người dùng
        navigate('/showcart'); // Điều hướng đến trang giỏ hàng
    };

    return (
        <div className="col-md-9 canhgiua">
            <h3 style={{ textAlign: 'center', color: '#333', fontWeight: 'bold' }}>ĐỒNG HỒ NỮ</h3>
            <section>
                <div className="container" style={{ maxWidth: '1264px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '50px' }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                        <h3>SẢN PHẨM NỔI BẬT</h3>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    </div>
                    <div className="bg" style={{ width: '1230px' }}>
                        <div className="row">
                            {displayedProducts.map((product, index) => (
                                <div className="col-md-3 col-sm-12" key={index}>
                                    <div className="card">
                                        <a href={`/chitiet/${product.ma_san_pham}`}>
                                            <img className="card-img-top" src={product.hinh} alt={product.ten_san_pham} />
                                        </a>
                                        <p style={{ textAlign: 'center' }}>{product.ten_san_pham}</p>
                                        <p style={{ textAlign: 'left' }}>
                                            <span style={{ textDecoration: 'line-through', color: 'black' }}>
                                                {product.Gia}
                                            </span>
                                            <br />
                                            <span style={{ fontWeight: 'bold' }}>
                                                {product.gia_giam} VNĐ
                                            </span>
                                        </p>
                                        <p className="product-buttons" style={{ textAlign: 'center' }}>
                                            <button onClick={() => handleAddToCart(product)}>Thêm vào giỏ</button>
                                            <button onClick={() => handleBuyNow(product)}>Mua ngay</button>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row justify-content-md-center">
                            <div className="col-md-12" style={{ textAlign: 'center' }}>
                                <button className="showmore"
                                    onClick={() => setShowAll(!showAll)}
                                    style={{
                                        margin: '20px auto', padding: '10px 20px', color: '#007BFF', background: 'none', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'underline', fontSize: '16px', transition: 'color 0.3s, transform 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#0056b3'} 
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#007BFF'}
                                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'} 
                                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                    {showAll ? 'Ẩn bớt' : 'Hiển Thị Thêm'}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style={{ marginLeft: '5px' }}>
                                        <path fill="currentColor" d="M11.5 8H1v1h10.5l-3.5 3.5 1.5 1.5L15 8l-5.5-5.5-1.5 1.5z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DongHoNu;
