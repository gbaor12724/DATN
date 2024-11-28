const mysql = require('mysql2');
const exp = require('express');
const app = exp();
const cors = require('cors');
const emailjs = require('emailjs-com'); // Import EmailJS
require('dotenv').config();  // Đọc biến môi trường từ tệp .env
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use([cors(), exp.json()]);

// Kết nối đến cơ sở dữ liệu MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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

// API lấy chi tiết sản phẩm theo mã
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

// API gửi email liên hệ
app.post('/api/contact', (req, res) => {
  const { name, email, sdt, message } = req.body;

  // Xác định các tham số cần thiết cho template
  const templateParams = {
    from_name: name,
    from_email: email,
    phone: sdt,
    message: message
  };

  // Gửi email qua EmailJS
  emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, templateParams, process.env.EMAILJS_USER_ID)
    .then((response) => {
      console.log('Email đã được gửi:', response.status, response.text);
      res.json({ "status": "success", "message": "Email đã được gửi thành công" });
    }, (error) => {
      console.error('Lỗi gửi email:', error);
      res.status(500).json({ "status": "error", "message": "Lỗi khi gửi email", "error": error.text });
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
// app.post('/login', (req, res) => {
//   const { email, mat_khau } = req.body;
//   const query = 'SELECT * FROM nguoi_dung WHERE email = ? AND mat_khau = ?';

//   db.query(query, [email, mat_khau], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: 'Lỗi server' });
//     }
//     if (result.length > 0) {
//       return res.status(200).json({ message: 'Đăng nhập thành công', user: result[0] });
//     } else {
//       return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
//     }
//   });
// });

// API: Đăng nhập
app.post('/api/login', (req, res) => {
  const { email, mat_khau } = req.body;

  const query = 'SELECT * FROM nguoi_dung WHERE email = ?';
  db.query(query, [email], (err, results) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
      }
      if (results.length === 0) {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const user = results[0];

      bcrypt.compare(mat_khau, user.mat_khau, (err, isMatch) => {
          if (err) {
              console.error('Password comparison error:', err);
              return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
          }
          if (!isMatch) {
              return res.status(401).json({ success: false, message: 'Invalid email or password' });
          }

          const token = jwt.sign(
              { id: user.ma_nguoi_dung, email: user.email },
              process.env.JWT_SECRET_KEY || 'default_secret_key', // Tốt nhất nên lưu key trong biến môi trường
              { expiresIn: '1h' }
          );

          return res.json({
              success: true,
              message: 'Login successful',
              token: token,
              user: { id: user.ma_nguoi_dung, email: user.email, name: user.ho_ten , vaitro:user.vai_tro },
          });
      });
  });
});


// API Đăng ký
app.post('/api/register', (req, res) => {
  const {
    ten_nguoi_dung, 
    email, 
    mat_khau, 
    vai_tro = 'user',  // Vai trò mặc định là 'user'
    so_dien_thoai, 
    dia_chi, 
    diem_thuong = 0,  // Điểm thưởng mặc định là 0
    hinh, 
    google_id
  } = req.body;

  // Kiểm tra nếu tất cả các trường bắt buộc có giá trị
  if (!ten_nguoi_dung || !email || !mat_khau || !so_dien_thoai || !dia_chi) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ thông tin.' });
  }

  // Kiểm tra email đã tồn tại trong cơ sở dữ liệu
  const checkEmailQuery = 'SELECT * FROM nguoi_dung WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error('Email check error:', err);
      return res.status(500).json({ success: false, message: 'Lỗi kiểm tra email. Vui lòng thử lại sau.' });
    }

    // Nếu email đã tồn tại, trả về lỗi
    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'Email đã tồn tại. Vui lòng sử dụng email khác.' });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    bcrypt.hash(mat_khau, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Password hashing error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi mã hóa mật khẩu. Vui lòng thử lại sau.' });
      }

      // Câu lệnh INSERT vào cơ sở dữ liệu
      const query = `
        INSERT INTO nguoi_dung 
        (ten_nguoi_dung, email, mat_khau, vai_tro, so_dien_thoai, dia_chi, diem_thuong, ngay_tao, hinh, google_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)
      `;
      db.query(query, [ten_nguoi_dung, email, hashedPassword, vai_tro, so_dien_thoai, dia_chi, diem_thuong, hinh || null, google_id || null], (err, result) => {
        if (err) {
          console.error('Registration error:', err);
          return res.status(500).json({ success: false, message: 'Lỗi khi lưu người dùng vào cơ sở dữ liệu. Vui lòng thử lại.', err });
        }

        // Trả về phản hồi thành công
        res.status(200).json({ success: true, message: 'Đăng ký thành công! Bạn có thể đăng nhập ngay.' });
      });
    });
  });
});







// Admin - lấy tất cả sản phẩm
app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM san_pham';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Có lỗi khi truy vấn dữ liệu' });
    }
    res.json(results);
  });
});


// lấy sp
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM san_pham WHERE ma_san_pham = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Có lỗi khi truy vấn dữ liệu' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    res.json(results[0]);
  });
});


// Xóa sản phẩm
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM san_pham WHERE ma_san_pham = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Có lỗi khi xóa sản phẩm' });
    }
    res.json({ message: 'Sản phẩm đã được xóa thành công' });
  });
});

//sua sp
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const { name, price, description } = req.body;
  const query = 'UPDATE san_pham SET name = ?, price = ?, description = ? WHERE id = ?';
  db.query(query, [name, price, description, productId], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Database error' });
    } else {
      res.json({ message: 'Product updated' });
    }
  });
});

// Thêm sản phẩm
app.post('/api/products', (req, res) => {
  const product = req.body;
  const query = `
    INSERT INTO san_pham (
      ten_san_pham, Gia, so_luong_ton_kho, hinh, hinh2, ma_danh_muc, ma_thuong_hieu, 
      ma_chat_lieu, kieu_may, kha_nang_chong_nuoc, duong_kinh_dong_ho, chat_lieu_day_deo, 
      nam_nu, bao_hanh, gia_giam, mo_ta
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, Object.values(product), (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Lỗi khi thêm sản phẩm.' });
    }
    res.status(200).json({ success: true, message: 'Sản phẩm đã được thêm thành công!' });
  });
});



// API để nhận đơn hàng và lưu vào MySQL
app.post('/api/orders', (req, res) => {
  const { name, email, phone, address, city, notes, paymentMethod, agreeTerms, checkoutCart } = req.body;

  if (!name || !email || checkoutCart.length === 0) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin và chọn sản phẩm.' });
  }

  const query = `
      INSERT INTO orders (name, email, phone, address, city, notes, paymentMethod, agreeTerms, checkoutCart)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, email, phone, address, city, notes, paymentMethod, agreeTerms, JSON.stringify(checkoutCart)], (err, result) => {
    if (err) {
      console.error('Lỗi khi lưu đơn hàng:', err);
      return res.status(500).json({ message: 'Đã xảy ra lỗi khi lưu đơn hàng', error: err });
    }
    res.status(201).json({ message: 'Đặt hàng thành công!', orderId: result.insertId });
  });
});
// **1. Lấy danh sách thương hiệu**
app.get('/api/thuonghieu', (req, res) => {
  const query = 'SELECT * FROM thuonghieu';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Lỗi server' });
    res.status(200).json(results);
  });
});

// **2. Lấy thông tin một thương hiệu**
app.get('/api/thuonghieu/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM thuonghieu WHERE ma_thuong_hieu = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi server' });
    if (result.length === 0) return res.status(404).json({ error: 'Không tìm thấy thương hiệu' });
    res.status(200).json(result[0]);
  });
});

// **3. Thêm mới một thương hiệu**
app.post('/api/thuonghieu', (req, res) => {
  const { ten_thuong_hieu, quoc_gia, mo_ta } = req.body;
  if (!ten_thuong_hieu) return res.status(400).json({ error: 'Tên thương hiệu là bắt buộc' });

  const query = 'INSERT INTO thuonghieu (ten_thuong_hieu, quoc_gia, mo_ta) VALUES (?, ?, ?)';
  db.query(query, [ten_thuong_hieu, quoc_gia, mo_ta], (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi server' });
    res.status(201).json({ message: 'Thêm thương hiệu thành công', ma_thuong_hieu: result.insertId });
  });
});

// **4. Sửa thông tin thương hiệu**
app.put('/api/thuonghieu/:id', (req, res) => {
  const { id } = req.params;
  const { ten_thuong_hieu, quoc_gia, mo_ta } = req.body;

  const query = 'UPDATE thuonghieu SET ten_thuong_hieu = ?, quoc_gia = ?, mo_ta = ? WHERE ma_thuong_hieu = ?';
  db.query(query, [ten_thuong_hieu, quoc_gia, mo_ta, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi server' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy thương hiệu' });
    res.status(200).json({ message: 'Cập nhật thương hiệu thành công' });
  });
});

// **5. Xóa thương hiệu**
app.delete('/api/thuonghieu/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM thuonghieu WHERE ma_thuong_hieu = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Lỗi server' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Không tìm thấy thương hiệu' });
    res.status(200).json({ message: 'Xóa thương hiệu thành công' });
  });
});
// API để lấy danh sách người dùng
app.get('/api/nguoi-dung', (req, res) => {
  const query = 'SELECT * FROM nguoi_dung';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

// API để xem thông tin người dùng
app.get('/api/nguoi-dung/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM nguoi_dung WHERE ma_nguoi_dung = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// API để sửa thông tin người dùng
app.put('/api/nguoi-dung/:id', (req, res) => {
  const { id } = req.params;
  const { ten_nguoi_dung, email, vai_tro, so_dien_thoai, dia_chi } = req.body;

  const query = 'UPDATE nguoi_dung SET ten_nguoi_dung = ?, email = ?, vai_tro = ?, so_dien_thoai = ?, dia_chi = ? WHERE ma_nguoi_dung = ?';
  db.query(query, [ten_nguoi_dung, email, vai_tro, so_dien_thoai, dia_chi, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('User updated successfully');
    }
  });
});

// API để xóa người dùng
app.delete('/api/nguoi-dung/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM nguoi_dung WHERE ma_nguoi_dung = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('User deleted successfully');
    }
  });
});

// API để phân quyền người dùng
app.put('/api/nguoi-dung/phanquyen/:id', (req, res) => {
  const { id } = req.params;
  const { vai_tro } = req.body;

  const query = 'UPDATE nguoi_dung SET vai_tro = ? WHERE ma_nguoi_dung = ?';
  db.query(query, [vai_tro, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('User role updated successfully');
    }
  });
});
//api lây danh sách các tiunhr vn
app.get('/api/provinces', (req, res) => {
  const query = 'SELECT * FROM provinces';
  db.query(query, (err, results) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(results);
      }
  });
});
// Giả sử bạn sử dụng Express.js cho API backend
app.get('/api/nguoi-dung/:id', (req, res) => {
  const userId = req.params.id;
  // Lấy thông tin người dùng từ cơ sở dữ liệu bằng userId
  const user = getUserFromDatabase(userId); // Giả sử đây là hàm lấy thông tin từ DB
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Người dùng không tìm thấy');
  }
});

// Bắt đầu lắng nghe tại cổng đã chỉ định
app.listen(3000, () => console.log(`Ứng dụng đang chạy trên port 3000`));
