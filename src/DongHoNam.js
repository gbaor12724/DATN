import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { themSP } from './cartSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './DongHoNam.css';

function DongHoNam() {
    const [listsp, setListSP] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/donghonam/sanpham");
                if (!response.ok) throw new Error("Network response was not ok");
                
                const data = await response.json();
                const filteredProducts = data.filter(product => product.nam_nu === 'Nam');
                setListSP(filteredProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProducts();
    }, []);

    const displayedProducts = showAll ? listsp : listsp.slice(0, 12);

    return (
        <div className="col-md-9 canhgiua">
            <h3 style={{ textAlign: 'center' }}>ĐỒNG HỒ NAM</h3>
            <section>
                <div className="container" style={{ maxWidth: '1264px' }}>
                    <div className="bg" style={{ width: '1230px' }}>
                        <div className="row">
                            {displayedProducts.map((product) => (
                                <div className="col-md-3 col-sm-6" key={product.ma_san_pham}>
                                    <div className="card">
                                        <a href={`/chitiet/${product.ma_san_pham}`}>
                                            <img className="card-img-top" src={product.hinh} alt={product.ten_san_pham} />
                                        </a>
                                        <p style={{ textAlign: 'center' }}>{product.ten_san_pham}</p>
                                        <p style={{ textAlign: 'left' }}>
                                            <span style={{ textDecoration: 'line-through', color: 'black' }}>
                                                {product.Gia}₫
                                            </span>
                                            <br />
                                            <span style={{ fontWeight: 'bold' }}>
                                                {product.gia_giam}₫
                                            </span>
                                        </p>
                                        <div className="product-buttons" style={{ textAlign: 'center' }}>
                                            <button onClick={() => {
                                                dispatch(themSP({ ...product, so_luong: 1 })); // Thêm sản phẩm vào giỏ
                                                navigate('/showcart'); // Chuyển hướng đến trang giỏ hàng
                                            }}>
                                                Thêm vào giỏ
                                            </button>
                                            <button onClick={() => {
                                                dispatch(themSP({ ...product, so_luong: 1 })); // Thêm sản phẩm vào giỏ
                                                navigate('/showcart'); // Chuyển hướng đến trang giỏ hàng
                                            }}>
                                                Mua ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-12" style={{ textAlign: 'center' }}>
                            <div className="input-group">
                                <button className="showmore"
                                    onClick={() => setShowAll(!showAll)}
                                    style={{
                                        margin: '0 auto', padding: '10px 20px', color: '#007BFF', background: 'none', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'underline', fontSize: '16px', transition: 'color 0.3s, transform 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#0056b3'} 
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#007BFF'}
                                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'} 
                                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    {showAll ? 'Ẩn bớt' : 'Hiển Thị Thêm'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DongHoNam;
