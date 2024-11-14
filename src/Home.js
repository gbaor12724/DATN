import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { themSP } from './cartSlice';
import { Link } from "react-router-dom";
import bannerImage from './images/banner1.jpg';

function Home() {
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const [listsp, setListSP] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const dispatch = useDispatch();

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

    const displayedProducts = showAll ? listsp : listsp.slice(0, 8);

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    const handleAddToCart = (product) => {
        dispatch(themSP(product));
        alert(`${product.ten_san_pham} đã được thêm vào giỏ hàng!`);
    };

    return (
        <div className="col-md-9 canhgiua">
            <h3 style={{ textAlign: 'center' }}>ĐỒNG HỒ CHÍNH HÃNG CAO CẤP</h3>
            <p style={{ textAlign: 'center' }}>
                Chúng tôi cam kết mang lại những giá trị cao nhất & đồng hồ chính hãng cho khách hàng khi đến với RX-Luxury
            </p>
            <img src={bannerImage} width="100%" height="420px" alt="Banner quảng cáo đồng hồ" />

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
                                        <Link to={`/chitiet/${product.ma_san_pham}`}>
                                            <img className="card-img-top" src={product.hinh} alt={product.ten_san_pham} />
                                        </Link>
                                        <p style={{ textAlign: 'center' }}>{truncateText(product.ten_san_pham, 20)}</p>
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
                                            <button onClick={() => handleAddToCart(product)}>Mua ngay</button>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row justify-content-md-center">
                            <div className="col-md-12" style={{ textAlign: 'center' }}>
                                <div className="input-group">
                                    <button className="showmore"
                                        onClick={() => setShowAll(!showAll)}
                                        style={{
                                            margin: '0 auto', padding: '10px 20px', color: '#007BFF', background: 'none', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'underline', fontSize: '16px', transition: 'color 0.3s, transform 0.2s', display: 'flex', alignItems: 'center',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#0056b3'} onMouseLeave={(e) => e.currentTarget.style.color = '#007BFF'}
                                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'} >
                                        {showAll ? 'Ẩn bớt' : 'Hiển Thị Thêm'}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style={{ marginLeft: '5px' }}>
                                            <path fill="currentColor" d="M11.5 8H1v1h10.5l-3.5 3.5 1.5 1.5L15 8l-5.5-5.5-1.5 1.5z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Phần hiển thị Đồng hồ Nam và Nữ sẽ tương tự như trên */}
            {/* ... */}
            <button onClick={topFunction} id="myBtn" title="Go to top">^</button>
        </div>
    );
}

export default Home;
