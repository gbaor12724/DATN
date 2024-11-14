import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { themSP } from './cartSlice'; // Import your Redux action
import './SanPhamTheoThuongHieu.css';

function SanPhamTheoThuongHieu() {
    const [products, setProducts] = useState([]);
    const [brandName, setBrandName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [favorites, setFavorites] = useState(new Set());
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    const query = new URLSearchParams(useLocation().search);
    const brandId = query.get('brand');

    useEffect(() => {
        const fetchBrandName = async () => {
            if (!brandId) return;
            try {
                const response = await fetch(`http://localhost:3000/brands/${brandId}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const brandData = await response.json();
                setBrandName(brandData.name);
            } catch (error) {
                console.error("Error fetching brand name:", error);
            }
        };

        const fetchProducts = async () => {
            if (!brandId) return;
            try {
                const response = await fetch(`http://localhost:3000/donghonam/sanpham?brand=${brandId}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchBrandName();
        fetchProducts();
    }, [brandId]);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const toggleFavorite = (productId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(productId)) {
            newFavorites.delete(productId);
        } else {
            newFavorites.add(productId);
        }
        setFavorites(newFavorites);
    };

    const handleAddToCart = (product) => {
        dispatch(themSP({ ...product, so_luong: 1 })); // Add product to cart
        alert(`${product.ten_san_pham} đã được thêm vào giỏ hàng!`); // Notify user
    };

    const handleBuyNow = (product) => {
        dispatch(themSP({ ...product, so_luong: 1 })); // Add product to cart
        alert(`${product.ten_san_pham} đã được thêm vào giỏ hàng!`); // Notify user
        navigate('/showcart'); // Navigate to the cart page
    };

    if (products.length === 0) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="col-md-9 canhgiua">
            <h3 style={{ textAlign: 'center' }}>Sản phẩm của thương hiệu {brandName}</h3>
            <div className="bg" style={{ width: '1230px' }}>
                <div className="row">
                    {currentProducts.map(product => (
                        <div className="col-md-3 col-sm-12" key={product.ma_san_pham}>
                            <div className="card position-relative">
                                <span 
                                    className="heart-icon" 
                                    role="img" 
                                    aria-label="Yêu thích" 
                                    onClick={() => toggleFavorite(product.ma_san_pham)}
                                    style={{ color: favorites.has(product.ma_san_pham) ? 'red' : 'black' }}
                                >
                                    ❤️
                                </span>
                                <img className="card-img-top" src={product.hinh} alt={product.ten_san_pham} />
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

            {/* Pagination controls */}
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-md-12" style={{ textAlign: 'center' }}>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SanPhamTheoThuongHieu;
