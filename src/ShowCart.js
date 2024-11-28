import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './asests/css/ShowCart.css';

function ShowCart() {
    const [listcart, setListCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('listCart')) || [];
        setListCart(storedCart);
    }, []);

    const handleClearCart = () => {
        localStorage.removeItem('listCart');
        setListCart([]);
    };

    const updateQuantity = (id, quantity) => {
        const updatedCart = listcart.map(item =>
            item.ma_san_pham === id ? { ...item, so_luong: quantity } : item
        );
        setListCart(updatedCart);
        localStorage.setItem('listCart', JSON.stringify(updatedCart));
    };

    const handleRemoveItem = (id) => {
        const updatedCart = listcart.filter(item => item.ma_san_pham !== id);
        setListCart(updatedCart);
        localStorage.setItem('listCart', JSON.stringify(updatedCart));
    };

    const handleCheckout = () => {
        localStorage.setItem('checkoutCart', JSON.stringify(listcart));
    };

    if (listcart.length === 0) {
        return (
            <div id="giohang">
                <h2>Giỏ Hàng</h2>
                <p>KHÔNG CÓ SẢN PHẨM</p>
            </div>
        );
    }

    return (
        <div className="container">
            <table id="cart" className="table table-hover table-condensed">
                <thead>
                    <tr>
                        <th style={{ width: '50%' }}>Tên sản phẩm</th>
                        <th style={{ width: '15%' }}>Giá</th>
                        <th style={{ width: '10%' }}>Số lượng</th>
                        <th style={{ width: '15%' }} className="text-center">Thành tiền</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {listcart.map(sp => (
                        <tr key={sp.ma_san_pham}>
                            <td>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <img className="imgcard" src={sp.hinh} alt={sp.ten_san_pham} />
                                    </div>
                                    <div className="col-sm-8">
                                        <h4>{sp.ten_san_pham}</h4>
                                    </div>
                                </div>
                            </td>
                            <td>{Number(sp.Gia).toLocaleString('vi')} VNĐ</td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control text-center"
                                    value={sp.so_luong}
                                    onChange={e => updateQuantity(sp.ma_san_pham, Number(e.target.value))}
                                />
                            </td>
                            <td className="text-center">
                                {(Number(sp.Gia) * sp.so_luong).toLocaleString('vi')} VNĐ
                            </td>
                            <td>
                                <button
                                    onClick={() => handleRemoveItem(sp.ma_san_pham)}
                                    className="btn btn-danger"
                                    style={{ padding: '5px 10px' }}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <Link to="/" className="btn btn-warning">
                                <i className="fa fa-angle-left"></i> Tiếp tục mua hàng
                            </Link>
                        </td>
                        <td colSpan="2" className="hidden-xs"></td>
                        <td className="hidden-xs text-center">
                            <strong>
                                Tổng tiền: {listcart.reduce((total, item) => total + item.so_luong * item.Gia, 0).toLocaleString('vi')} VNĐ
                            </strong>
                        </td>
                        <td>
                            <Link
                                to="/thanhtoan"
                                className="btn btn-success"
                                id="thanh-toan"
                                onClick={handleCheckout}
                            >
                                THANH TOÁN
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="5" className="text-right">
                            <button onClick={handleClearCart} className="btn btn-danger">
                                Xóa hết sản phẩm
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default ShowCart;
