import React, { useEffect, useState } from 'react';
import './asests/css/Thanhtoan.css';
import axios from 'axios';

const Thanhtoan = () => {
    const [checkoutCart, setCheckoutCart] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        notes: '',
        paymentMethod: 'cod',
        agreeTerms: false,
    });
    const [cities, setCities] = useState([]);

    // Lấy thông tin giỏ hàng từ localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('checkoutCart')) || [];
        setCheckoutCart(storedCart);
    }, []);

    // Lấy danh sách tỉnh thành từ API
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/provinces');
                setCities(response.data);
            } catch (err) {
                console.error('Lỗi khi tải danh sách tỉnh thành: ', err);
            }
        };
        fetchCities();
    }, []);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || checkoutCart.length === 0) {
            alert('Vui lòng điền đầy đủ thông tin và chọn sản phẩm.');
            return;
        }

        // Chuẩn bị dữ liệu đơn hàng
        const orderData = {
            ...formData,
            checkoutCart,
            orderDate: new Date(),
        };

        try {
            const response = await axios.post('http://localhost:3000/api/orders', orderData);
            if (response.status === 201) {
                alert('Đặt hàng thành công!');
            }
        } catch (err) {
            alert('Đã xảy ra lỗi khi đặt hàng: ' + err.message);
        }
    };

    return (
        <form className="thanhtoan-form" onSubmit={handleSubmit}>
            <h2>Thông tin giao hàng</h2>
            <label>
                Tên khách hàng
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Email
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Số điện thoại
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>
                Địa chỉ
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </label>
            <label>
                Thành phố
                <select name="city" value={formData.city} onChange={handleChange} required>
                    <option value="">Chọn tỉnh/thành phố</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>
            </label>
            <label>
                Ghi chú
                <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
            </label>
            <div>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                    />
                    Thanh toán khi nhận hàng
                </label>
            </div>
            <label>
                <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                />
                Đồng ý với điều khoản
            </label>
            <button type="submit">Đặt hàng</button>
        </form>
    );
};

export default Thanhtoan;
