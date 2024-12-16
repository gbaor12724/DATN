import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    ten_san_pham: '',
    Gia: '',
    so_luong_ton_kho: '',
    hinh: '',
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

  const [loading, setLoading] = useState(true);

  // Lấy thông tin sản phẩm khi sửa
  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  // Xử lý form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Sửa sản phẩm thành công!');
        navigate('/admin');
      })
      .catch((error) => console.error(error));
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div>
      <h2>Sửa sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={product.ten_san_pham}
          onChange={(e) => setProduct({ ...product, ten_san_pham: e.target.value })}
          placeholder="Tên sản phẩm"
        />
        <input
          type="number"
          value={product.Gia}
          onChange={(e) => setProduct({ ...product, Gia: e.target.value })}
          placeholder="Giá"
        />
        <input
          type="number"
          value={product.so_luong_ton_kho}
          onChange={(e) => setProduct({ ...product, so_luong_ton_kho: e.target.value })}
          placeholder="Số lượng tồn kho"
        />
        <input
          type="text"
          value={product.hinh}
          onChange={(e) => setProduct({ ...product, hinh: e.target.value })}
          placeholder="Hình ảnh"
        />
        <textarea
          value={product.mo_ta}
          onChange={(e) => setProduct({ ...product, mo_ta: e.target.value })}
          placeholder="Mô tả"
        />
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
};

export default EditProduct;
