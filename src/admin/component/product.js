import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/admin.css'; 

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Kiểm tra có đang sửa hay không
  const [currentProduct, setCurrentProduct] = useState({ name: '', price: '', description: '' }); // Thông tin sản phẩm đang chỉnh sửa

  // Lấy danh sách sản phẩm
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Lỗi:', error));
  }, []);

  // Xóa sản phẩm
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        alert('Sản phẩm đã được xóa');
        setProducts(products.filter(product => product.ma_san_pham !== id));
      })
      .catch(error => console.error('Lỗi xóa sản phẩm:', error));
  };

  // Bắt đầu chỉnh sửa sản phẩm
  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct({
      id: product.ma_san_pham,
      name: product.ten_san_pham,
      price: product.Gia,
      description: product.mo_ta,
    });
  };

  // Cập nhật thông tin sản phẩm
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Gửi yêu cầu cập nhật sản phẩm
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const { name, price, description, id } = currentProduct;

    fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, description }),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Sản phẩm đã được cập nhật');
        setIsEditing(false); // Thoát khỏi chế độ sửa
        // Cập nhật lại danh sách sản phẩm
        fetch('http://localhost:3000/api/products')
          .then(response => response.json())
          .then(data => setProducts(data))
          .catch(error => console.error('Lỗi:', error));
      })
      .catch((error) => console.error('Lỗi cập nhật sản phẩm:', error));
  };

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>

      <div className={isEditing ? 'product-management hidden' : 'product-management'}>
        <Link to="/product/add" className="btn btn-primary">Thêm sản phẩm mới</Link>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.ma_san_pham} className="product-card">
              <img src={product.hinh} alt={product.ten_san_pham} />
              <h3>{product.ten_san_pham}</h3>
              <p className="price">{product.Gia} VND</p>
              <p>{product.mo_ta}</p>
              <button onClick={() => handleEdit(product)} className="btn btn-info">Sửa</button>
              <button onClick={() => handleDelete(product.ma_san_pham)} className="btn btn-danger">Xóa</button>
            </div>
          ))}
        </div>
      </div>

      {/* Form sửa sản phẩm */}
      {isEditing && (
        <div className="edit-product-form">
          <h3>Sửa sản phẩm</h3>
          <form onSubmit={handleUpdateProduct}>
            <div>
              <label>Tên sản phẩm:</label>
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleEditChange}
                required
              />
            </div>
            <div>
              <label>Giá sản phẩm:</label>
              <input
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleEditChange}
                required
              />
            </div>
            <div>
              <label>Mô tả:</label>
              <textarea
                name="description"
                value={currentProduct.description}
                onChange={handleEditChange}
                required
              />
            </div>
            <button type="submit">Cập nhật</button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Hủy</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Product;
