// src/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './asests/css/ProductGrid.css';

function ProductList() {
    const [san_phams, setSanPhams] = useState([]); // Đổi tên state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedIndices, setExpandedIndices] = useState([]); // Trạng thái để theo dõi các chỉ số được mở rộng

    useEffect(() => {
        const fetchSanPhams = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/sanpham'); // Đường dẫn đến API
                setSanPhams(response.data); // Đổi tên hàm gọi state
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
                setError('Không thể lấy danh sách sản phẩm.');
            } finally {
                setLoading(false);
            }
        };

        fetchSanPhams();
    }, []);

    const toggleExpand = (index) => {
        setExpandedIndices(prev => 
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Danh Sách Sản Phẩm</h1>
            <ul>
                {san_phams.map((san_pham, index) => {
                    const imageUrl = `http://localhost:3000/api/images/${san_pham.hinh}`; // Tạo URL hình ảnh

                    const isExpanded = expandedIndices.includes(index); // Kiểm tra trạng thái mở rộng

                    return (
                        <li key={san_pham.ma_san_pham}>
                            <h2>{san_pham.ten_san_pham}</h2>
                           
                            <p style={{ color: 'red' }}>Giá giảm: {san_pham.gia_giam} đ</p>
                            <img src={imageUrl} alt={san_pham.hinh} />
                            <p>
                                {isExpanded || san_pham.mo_ta.length <= 100 
                                    ? san_pham.mo_ta 
                                    : `${san_pham.mo_ta.slice(0, 100)}...`}
                            </p>
                            <button onClick={() => toggleExpand(index)} style={{ cursor: 'pointer' }}>
                                {isExpanded ? 'Less' : 'Show'}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ProductList;
