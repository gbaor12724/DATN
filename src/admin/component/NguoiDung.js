import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/NguoiDung.css'; // Đảm bảo đã tạo và import file CSS

const NguoiDungManager = () => {
  const [nguoiDungList, setNguoiDungList] = useState([]);
  const [form, setForm] = useState({ ten_nguoi_dung: '', email: '', vai_tro: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Lấy danh sách người dùng
  useEffect(() => {
    fetchNguoiDung();
  }, []);

  const fetchNguoiDung = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/nguoi-dung');
      setNguoiDungList(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    }
  };

  // Thêm hoặc sửa người dùng
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/api/nguoi-dung/${editingId}`, form);
        alert('Cập nhật thành công!');
      } else {
        await axios.post('http://localhost:3000/api/nguoi-dung', form);
        alert('Thêm mới thành công!');
      }
      setForm({ ten_nguoi_dung: '', email: '', vai_tro: '' });
      setIsEditing(false);
      setEditingId(null);
      fetchNguoiDung();
    } catch (error) {
      console.error('Lỗi khi thêm hoặc sửa người dùng:', error);
    }
  };

  // Xóa người dùng
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/nguoi-dung/${id}`);
      alert('Xóa thành công!');
      fetchNguoiDung();
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
    }
  };

  // Điền thông tin để sửa
  const handleEdit = (nguoiDung) => {
    setForm(nguoiDung);
    setIsEditing(true);
    setEditingId(nguoiDung.ma_nguoi_dung);
  };

  return (
    <div>
      <h1>Quản Lý Người Dùng</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên người dùng"
          value={form.ten_nguoi_dung}
          onChange={(e) => setForm({ ...form, ten_nguoi_dung: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Vai trò"
          value={form.vai_tro}
          onChange={(e) => setForm({ ...form, vai_tro: e.target.value })}
        />
        <button type="submit">{isEditing ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {nguoiDungList.map((nguoiDung) => (
            <tr key={nguoiDung.ma_nguoi_dung}>
              <td>{nguoiDung.ma_nguoi_dung}</td>
              <td>{nguoiDung.ten_nguoi_dung}</td>
              <td>{nguoiDung.email}</td>
              <td>{nguoiDung.vai_tro}</td>
              <td>
                <button onClick={() => handleEdit(nguoiDung)}>Sửa</button>
                <button onClick={() => handleDelete(nguoiDung.ma_nguoi_dung)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NguoiDungManager;
