import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { themSP } from './cartSlice'; // Đảm bảo bạn có file cartSlice.js với actions này
import './asests/css/SearchPage.css';
import { Link } from "react-router-dom";
const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAll, setShowAll] = useState(false); // Trạng thái để kiểm tra có hiển thị tất cả hay không
    const query = new URLSearchParams(useLocation().search).get('query');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!query) {
            setError('Vui lòng nhập từ khóa tìm kiếm');
            setLoading(false);
            return;
        }

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/search?query=${query}`);
                setProducts(response.data);
                if (response.data.length === 0) {
                    setError('Không tìm thấy sản phẩm nào.');
                }
            } catch (err) {
                console.error('Lỗi khi lấy sản phẩm:', err);
                setError('Không thể lấy danh sách sản phẩm.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query]);

    const productsPerPage = 8;  // Số sản phẩm mỗi trang
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const displayedProducts = products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

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
    const addToFavorites = (product) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = favorites.some(item => item.ma_san_pham === product.ma_san_pham)
            ? favorites
            : [...favorites, product]; // Nếu sản phẩm đã có trong danh sách yêu thích thì không thêm nữa
    
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
    return (
        <div className="col-md-9 canhgiua">
            <section>
                <div className="container" style={{ maxWidth: '1264px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '50px' }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                        <h3>TÌM KIẾM: {query}</h3>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    </div>
                    {loading ? (
                        <div>Đang tải...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        <div className="bg" style={{ width: '1230px' }}>
                            <div className="row">
                                {displayedProducts.map((product, index) => (
                                    <div className="col-md-3 col-sm-12" key={index}>
                                        <div className="card">
                                            <Link to={`/chitiet/${product.ma_san_pham}`}>
                                                <img className="card-img-top" src={product.hinh} alt={product.ten_san_pham} />
                                            </Link>
                                            <p style={{ textAlign: 'center' }}>{truncateText(product.ten_san_pham, 20)}</p>
                                            <p className="product-price" style={{ textAlign: 'left', marginLeft: '14px', marginBottom: '20px' }}>
                                                Giá gốc: <span style={{ textDecoration: 'line-through', color: 'black' }}>
                                                    {Number(product.Gia).toLocaleString('vi-VN')} VNĐ
                                                </span>
                                                <br />
                                                <span style={{ fontWeight: 'bold', color: 'red' }}>
                                                    Giá: {Number(product.gia_giam).toLocaleString('vi-VN')} VNĐ
                                                </span>
                                            </p>

                                            <p className="product-buttons" style={{ textAlign: 'center' }}>
                                            <button onClick={() => addCart(product)}>Thêm vào giỏ</button>
                                            <button onClick={() => addToFavorites(product)}>Thêm vào yêu thích</button>
                                        </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

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
        </div>
    );
};

export default SearchPage;
