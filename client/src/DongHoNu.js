import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { themSP } from './cartSlice';
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import './asests/css/DongHoNu.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Component Pagination đơn giản
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination-container">
            <button 
                className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}

            <button
                className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

function DongHoNu() {
    const [listsp, setListSP] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const dispatch = useDispatch();

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = listsp.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(listsp.length / productsPerPage);

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
            : [...favorites, product];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="col-md-9 canhgiua">
            <section>
                <div className="container" style={{ maxWidth: '1264px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '50px' }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                        <h3>ĐỒNG HỒ NỮ</h3>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    </div>
                    <div className="bg" style={{ width: '1230px' }}>
                        <div className="row">
                            {currentProducts.map((product, index) => (
                                <div className="col-md-3 col-sm-12" key={index}>
                                    <div className="card product-item">
                                        <Link to={`/chitiet/${product.ma_san_pham}`}>
                                            <img className="card-img-top" src={product.hinh} alt={product.ten_san_pham} />
                                        </Link>
                                        <p className="product-name" style={{ textAlign: 'center' }}>
                                            {truncateText(product.ten_san_pham, 100)}
                                        </p>
                                        <p className="product-price" style={{ textAlign: 'left' }}>
                                            GIÁ GỐC: <span style={{ textDecoration: 'line-through', color: 'black' }}>
                                                {Number(product.Gia).toLocaleString('vi-VN')} VNĐ
                                            </span>
                                            <br />
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>
                                                GIÁ KHUYẾN MẠI : {Number(product.gia_giam).toLocaleString('vi-VN')} VNĐ
                                            </span>
                                        </p>
                                        <p className="product-buttons" style={{ textAlign: 'center' }}>
                                            <button onClick={() => addCart(product)} style={buttonStyle}>
                                                <FaShoppingCart style={iconStyle} /> Giỏ hàng
                                            </button>
                                            <button onClick={() => addToFavorites(product)} style={buttonStyle}>
                                                <FaHeart style={iconStyle} /> Yêu thích
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </section>
        </div>
    );
}

const buttonStyle = {
    padding: '8px 16px',
    margin: '5px',
    fontSize: '14px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#A0522D',
    color: 'white',
    cursor: 'pointer',
};

const iconStyle = {
    marginRight: '8px',
};

const paginationStyles = {
    '.pagination-container': {
        display: 'flex',
        justifyContent: 'center',
        gap: '5px',
        marginTop: '20px',
    },
    '.pagination-button': {
        padding: '8px 12px',
        border: '1px solid #ddd',
        background: 'white',
        cursor: 'pointer',
        borderRadius: '4px',
    },
    '.pagination-button.active': {
        background: '#A0522D',
        color: 'white',
        border: '1px solid #A0522D',
    },
    '.pagination-button:hover': {
        background: '#A0522D',
        color: 'white',
    },
    '.pagination-button:disabled': {
        background: '#eee',
        cursor: 'not-allowed',
    },
};

export default DongHoNu;
