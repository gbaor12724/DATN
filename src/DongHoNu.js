import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { themSP } from './cartSlice';
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import icons từ react-icons

function DongHoNu() {
    const [listsp, setListSP] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/donghonam/sanpham"); // API cho sản phẩm nữ
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const filteredProducts = data.filter(product => product.nam_nu === 'Nữ'); // Lọc sản phẩm cho nữ
                setListSP(filteredProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProducts();
    }, []);

    const displayedProducts = showAll ? listsp : listsp.slice(0, 16);

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
                        <h3>ĐỒNG HỒ NỮ</h3>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    </div>
                    <div className="bg" style={{ width: '1230px' }}>
                        <div className="row">
                            {displayedProducts.map((product, index) => (
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
export default DongHoNu;
