import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ShowFavorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

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

    // Xóa sản phẩm yêu thích
    const handleRemoveFavorite = (productId) => {
        const updatedFavorites = favorites.filter(product => product.ma_san_pham !== productId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    // Xóa tất cả sản phẩm yêu thích
    const handleClearFavorites = () => {
        setFavorites([]);
        localStorage.removeItem('favorites');
    };

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    return (
        <div className="col-md-9 canhgiua">
            <section>
                <div className="container" style={{ maxWidth: '1264px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '50px' }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                        <h3>DANH SÁCH YÊU THÍCH</h3>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    </div>
                    <div className="bg" style={{ width: '1230px' }}>
                        <div className="row">
                            {favorites.length === 0 ? (
                                <p style={{ textAlign: 'center', width: '100%' }}>Không có sản phẩm yêu thích nào!</p>
                            ) : (
                                favorites.map((product, index) => (
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
                                                <button onClick={() => handleRemoveFavorite(product.ma_san_pham)} style={{ marginTop: '10px' }}>Xóa</button>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Nút Xóa Tất Cả */}
                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <button onClick={handleClearFavorites} className="btn btn-danger">
                            Xóa tất cả sản phẩm
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ShowFavorites;
