const mysql = require('mysql2');
const exp = require('express');
const app = exp();
const cors = require('cors');
app.use([cors(), exp.json()]);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'rx_luxury'
});

db.connect(err => {
    if (err) throw err;
    console.log('Đã kết nối đến database');
});

// API để lấy sản phẩm với giới hạn
app.get('/donghonam/sanpham', (req, res) => {
    const query = 'SELECT * FROM san_pham';
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            return;
        }
        res.json(result);
    });
});

// API tìm kiếm sản phẩm
app.get('/api/search', (req, res) => {
    const searchTerm = req.query.query;
    if (!searchTerm) {
        return res.status(400).send('Thiếu từ khóa tìm kiếm');
    }
    const query = 'SELECT * FROM san_pham WHERE ten_san_pham LIKE ?';
    db.query(query, [`%${searchTerm}%`], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        }
        res.json(result);
    });
});

app.get('/api/chitetsanpham/:ma_san_pham', (req, res) => {
    const maSanPham = req.params.ma_san_pham; // Lấy mã sản phẩm từ URL
    const query = 'SELECT * FROM san_pham WHERE ma_san_pham = ?'; // Truy vấn sản phẩm theo mã sản phẩm

    db.query(query, [maSanPham], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            return;
        }

        if (result.length === 0) {
            // Nếu không tìm thấy sản phẩm
            res.status(404).send('Không tìm thấy sản phẩm');
        } else {
            // Trả về dữ liệu sản phẩm
            res.json(result);
        }
    });
});

// Thương hiệu
app.get('/donghonam/sanpham', async (req, res) => {
    const brandId = req.query.brand;
    let query = 'SELECT * FROM san_pham';
    if (brandId) {
        query += ` WHERE ma_thuong_hieu = ${brandId}`;
    }
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            return;
        }
        res.json(result);
    });
});

// Giỏ hàng
app.post('/luudonhang/', (req, res) => {
    let data = req.body;
    let sql = 'INSERT INTO don_hang SET ?';
    db.query(sql, data, (err, result) => {
        if (err) res.json({ "id_dh": -1, "thongbao": "Lỗi lưu đơn hàng", err })
        else {
            const id_dh = result.insertId;
            res.json({ "id_dh": id_dh, "thongbao": "Đã lưu đơn hàng" });
        }
    });
});

// Lấy chi tiết 1 sản phẩm
app.get('/sp/:id', (req, res) => {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({ "thongbao": "Không biết sản phẩm", "id": id });
        return;
    }
    let sql = 'SELECT ten_san_pham, mo_ta, Gia, hinh, nam_nu, gia_giam FROM san_pham WHERE id = ?';
    db.query(sql, [id], (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err });
        else res.json(data[0]);
    });
});

// Đăng nhập
app.post('/login', (req, res) => {
    const { email, mat_khau } = req.body;
    const query = 'SELECT * FROM nguoi_dung WHERE email = ? AND mat_khau = ?';

    db.query(query, [email, mat_khau], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi server' });
        }
        if (result.length > 0) {
            return res.status(200).json({ message: 'Đăng nhập thành công', user: result[0] });
        } else {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }
    });
});

// Admin - lấy tất cả sản phẩm
app.get('/tatcasanpham', (req, res) => {
    let sql = 'SELECT * FROM san_pham ORDER BY ma_san_pham DESC';
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy list sp", err });
        else res.json(data);
    });
});

// Xóa sản phẩm
app.delete('/xoasanpham/:ma_san_pham', (req, res) => {
    const id = req.params.ma_san_pham;
    const sql = 'DELETE FROM san_pham WHERE ma_san_pham = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ "thongbao": "Lỗi xóa sản phẩm", err });
        } else {
            res.json({ "thongbao": "Sản phẩm đã được xóa" });
        }
    });
});

// Thêm sản phẩm
app.post('/them_sanpham', (req, res) => {
    const { ten_sp, gia, gia_km, id_loai, ngay, hinh, an_hien, mo_ta } = req.body;

    if (!id_loai) {
        return res.status(400).json({ thongbao: 'Thiếu trường id_loai' });
    }

    let sql = 'INSERT INTO san_pham (ten_san_pham, Gia, so_luong_ton_kho, ma_danh_muc, ma_thuong_hieu, ma_chat_lieu, kieu_may, kha_nang_chong_nuoc, duong_kinh_dong_ho, chat_lieu_day_deo, nam_nu, bao_hanh, gia_giam, ngay_tao, ma_khuyen_mai, luot_xem, mo_ta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let values = [ten_sp, gia, gia_km, id_loai, ngay, hinh, an_hien, mo_ta];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Lỗi thêm sản phẩm:', err);
            res.status(500).json({ thongbao: 'Lỗi thêm sản phẩm', err });
        } else {
            res.json({ thongbao: 'Sản phẩm đã được thêm' });
        }
    });
});

// Bắt đầu lắng nghe tại cổng đã chỉ định
app.listen(3000, () => console.log(`Ứng dụng đang chạy trên port 3000`));
