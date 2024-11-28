import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { themSP } from './cartSlice';
import { Link, useLocation } from "react-router-dom";

function SanPhamTheoThuongHieu() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const dispatch = useDispatch();

    const query = new URLSearchParams(useLocation().search);
    const brandId = query.get('brand');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/donghonam/sanpham?brand=${brandId}`);
                if (!response.ok) throw new Error("Network response was not ok");
                
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError("Lỗi khi tải sản phẩm, vui lòng thử lại.");
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [brandId]);

    const displayedProducts = showAll ? products : products.slice(0, 8);

    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <section>
                <div className="container" style={{ maxWidth: '1264px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '50px' }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                        <h3>SẢN PHẨM THEO ...</h3>
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
                                        <div className="product-buttons" style={{ textAlign: 'center' }}>
                                            <button onClick={() => dispatch(themSP(product))}>Thêm vào giỏ</button>
                                            <button onClick={() => dispatch(themSP(product))}>Mua ngay</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row justify-content-md-center">
                            <div className="col-md-12" style={{ textAlign: 'center' }}>
                                <button 
                                    className="showmore"
                                    onClick={() => setShowAll(!showAll)}
                                    style={{
                                        margin: '0 auto', padding: '10px 20px', color: '#007BFF', background: 'none', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'underline', fontSize: '16px', transition: 'color 0.3s, transform 0.2s', display: 'flex', alignItems: 'center',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#0056b3'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#007BFF'}
                                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
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

export default SanPhamTheoThuongHieu;
