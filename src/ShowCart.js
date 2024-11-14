import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { xoaSP, suaSL, xoaHetSP } from './cartSlice';
import { Link } from 'react-router-dom';
// import './ShowCart.css';
 
function ShowCart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.listSP);

    const handleClearCart = () => {
        dispatch(xoaHetSP());
    };

    // Tính tổng số tiền
    const totalAmount = cart.reduce((total, item) => total + (item.gia * item.so_luong), 0);

    if (cart.length === 0) {
        return (
            <div id="giohang" className="empty-cart">
                <h2>Giỏ Hàng</h2>
                <p>KHÔNG CÓ SẢN PHẨM</p>
            </div>
        );
    }

    return (
        <div id="giohang" className="cart-container">
            <h2>Giỏ Hàng</h2>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Hình</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Số Lượng</th>
                        <th>Đơn Giá</th>
                        <th>Số Tiền</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((sp) => (
                        <tr key={sp.id}>
                            <td><img className='imgcard' src={sp.hinh} alt={sp.ten_sp} /></td>
                            <td>{sp.ten_sp}</td>
                            <td>
                                <input
                                    className="soluong"
                                    type="number"
                                    value={sp.so_luong}
                                    min="1"
                                    onChange={e => {
                                        const quantity = parseInt(e.target.value);
                                        if (quantity > 0) {
                                            dispatch(suaSL([sp.id, quantity]));
                                        }
                                    }}
                                />
                            </td>
                            <td>{Number(sp.gia).toLocaleString("vi")} VNĐ</td>
                            <td>{Number(sp.gia * sp.so_luong).toLocaleString("vi")} VNĐ</td>
                            <td><button onClick={() => dispatch(xoaSP(sp.id))} className="remove-btn">Xóa</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {cart.length >= 2 && (
                <button onClick={handleClearCart} className="clear-cart-btn">Xóa tất cả</button>
            )}
            <div className="total-amount">
                <h3>Tổng Tiền: {totalAmount.toLocaleString("vi")} VNĐ</h3>
            </div>
            <Link to='/thanhtoan' className="btn btn-primary">Thanh Toán</Link>
        </div>
    );
}

export default ShowCart;
