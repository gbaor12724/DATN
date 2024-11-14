import React, { useState } from 'react';
import './Contact.css'; // Nhập file CSS nếu cần

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi form ở đây (ví dụ: gửi đến API)
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-container">
            <h1>Liên Hệ Chúng Tôi</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tin nhắn:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Gửi</button>
            </form>
        </div>
    );
}

export default Contact;
