// src/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductGrid.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedIndices, setExpandedIndices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/sanpham');
                setProducts(response.data);
            } catch (err) {
                console.error('Lỗi khi lấy sản phẩm:', err);
                setError('Không thể lấy danh sách sản phẩm.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
            alert(response.data.thongbao); // Hiển thị thông báo cho người dùng
            
            // Điều hướng đến trang giỏ hàng sau khi thêm thành công
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
        <div className="product-list">
            <h1>Danh Sách Sản Phẩm</h1>
            <ul>
                {products.map((product, index) => {
                    const imageUrl = `http://localhost:3000/api/images/${product.hinh}`;
                    const isExpanded = expandedIndices.includes(index);

                    return (
                        <li key={product.ma_san_pham} className="product-item">
                            <h2>{product.ten_san_pham}</h2>
                            <img src={imageUrl} alt={product.ten_san_pham} className="product-image" />
                            <p className="product-price" style={{ color: 'red' }}>Giá: {product.Gia} đ</p>
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
                                style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                Thêm vào giỏ hàng
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ProductList;
