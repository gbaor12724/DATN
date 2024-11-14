import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css';

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedIndices, setExpandedIndices] = useState([]);
    const query = new URLSearchParams(useLocation().search).get('query');
    const navigate = useNavigate();

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

    const toggleExpand = (index) => {
        setExpandedIndices((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const addToCart = async (product) => {
        try {
            const response = await axios.post('http://localhost:3000/luudonhang/', {
                ma_san_pham: product.ma_san_pham,
                ten_san_pham: product.ten_san_pham,
                gia: product.Gia,
                hinh: product.hinh,
            });
            alert(response.data.thongbao || 'Đã thêm vào giỏ hàng');
            navigate('/showcart');
        } catch (err) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', err);
            alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.');
        }
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="search-page">
            <h1>Kết quả tìm kiếm cho: "{query}"</h1>
            {products.length > 0 ? (
                <div className="product-list">
                    {products.map((product, index) => {
                        const imageUrl = `http://localhost:3000/api/images/${product.hinh}`;
                        const isExpanded = expandedIndices.includes(index);

                        return (
                            <div key={product.ma_san_pham} className="product-item">
                                <h2>{product.ten_san_pham}</h2>
                                <img src={imageUrl} alt={product.ten_san_pham} className="product-image" />
                                <p className="product-price" style={{ color: 'red' }}>
                                    {product.Gia} đ
                                </p>
                                <p className="product-description">
                                    {isExpanded || product.mo_ta.length <= 100
                                        ? product.mo_ta
                                        : `${product.mo_ta.slice(0, 100)}...`}
                                </p>
                                <button onClick={() => toggleExpand(index)} style={{ cursor: 'pointer' }}>
                                    {isExpanded ? 'Less' : 'Show'}
                                </button>
                                <button
                                    onClick={() => addToCart(product)}
                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>Không tìm thấy sản phẩm nào.</p>
            )}
        </div>
    );
};

export default SearchPage;
