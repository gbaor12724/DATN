import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    ten_san_pham: '',
    Gia: '',
    so_luong_ton_kho: '',
    hinh: '',
    hinh2: '',
    ma_danh_muc: '',
    ma_thuong_hieu: '',
    ma_chat_lieu: '',
    kieu_may: '',
    kha_nang_chong_nuoc: '',
    duong_kinh_dong_ho: '',
    chat_lieu_day_deo: '',
    nam_nu: '',
    bao_hanh: '',
    gia_giam: '',
    mo_ta: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (data.success) {
        alert('Sản phẩm đã được thêm thành công!');
      } else {
        alert('Thêm sản phẩm thất bại');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Đã xảy ra lỗi khi thêm sản phẩm');
    }
  };

  return (
    <div>
      <h1>Thêm Sản Phẩm Mới</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="ten_san_pham"
            value={product.ten_san_pham}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Giá</label>
          <input
            type="number"
            name="Gia"
            value={product.Gia}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Số lượng</label>
          <input
            type="number"
            name="so_luong_ton_kho"
            value={product.so_luong_ton_kho}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hình ảnh 1</label>
          <input
            type="text"
            name="hinh"
            value={product.hinh}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hình ảnh 2</label>
          <input
            type="text"
            name="hinh2"
            value={product.hinh2}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mã danh mục</label>
          <input
            type="number"
            name="ma_danh_muc"
            value={product.ma_danh_muc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mã thương hiệu</label>
          <input
            type="number"
            name="ma_thuong_hieu"
            value={product.ma_thuong_hieu}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mã chất liệu</label>
          <input
            type="number"
            name="ma_chat_lieu"
            value={product.ma_chat_lieu}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Kieu máy</label>
          <input
            type="text"
            name="kieu_may"
            value={product.kieu_may}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Khả năng chống nước</label>
          <input
            type="text"
            name="kha_nang_chong_nuoc"
            value={product.kha_nang_chong_nuoc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Đường kính đồng hồ</label>
          <input
            type="number"
            name="duong_kinh_dong_ho"
            value={product.duong_kinh_dong_ho}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Chất liệu dây đeo</label>
          <input
            type="text"
            name="chat_lieu_day_deo"
            value={product.chat_lieu_day_deo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nam/Nữ</label>
          <input
            type="text"
            name="nam_nu"
            value={product.nam_nu}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bảo hành</label>
          <input
            type="number"
            name="bao_hanh"
            value={product.bao_hanh}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Giá giảm</label>
          <input
            type="number"
            name="gia_giam"
            value={product.gia_giam}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mô tả</label>
          <textarea
            name="mo_ta"
            value={product.mo_ta}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
};

export default AddProduct;