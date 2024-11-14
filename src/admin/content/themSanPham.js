import React, { useEffect, useState } from "react";

const ThemSanPham = () => {
  const [danhsachloai, setDanhSachLoai] = useState([]);
  const [formData, setFormData] = useState({
    ten_sp: "",
    gia: "",
    gia_km: "",
    id_loai: "",
    ngay: "",
    hinh: "",
    an_hien: "",
    mo_ta: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/danhsachloai");        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDanhSachLoai(data);
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    try {
      const response = await fetch("http://localhost:3000/them_sanpham", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      alert(data.thongbao);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm.");
    }
  };

  return (
    <div className="row" style={{ margin: "20px 0px 0px 250px" }}>
      <div className="col-md-12">
        <div className="card card-border-color card-border-color-primary">
          <div className="card-header card-header-divider">
            Thêm sản phẩm của bạn
          </div>
          <div className="card-body">
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-sm-right">
                  Tên sản phẩm
                </label>
                <div className="col-12 col-sm-8 col-lg-6">
                  <input
                    className="form-control"
                    type="text"
                    name="ten_sp"
                    value={formData.ten_sp}
                    onChange={handleChange}
                    required
                    placeholder="Tên sản phẩm"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-sm-right">
                  Giá
                </label>
                <div className="col-12 col-sm-8 col-lg-6">
                  <input
                    className="form-control"
                    type="number"
                    name="gia"
                    value={formData.gia}
                    onChange={handleChange}
                    required
                    placeholder="Giá sản phẩm"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-sm-right">
                  Giá khuyến mãi
                </label>
                <div className="col-12 col-sm-8 col-lg-6">
                  <input
                    className="form-control"
                    type="number"
                    name="gia_km"
                    value={formData.gia_km}
                    onChange={handleChange}
                    required
                    placeholder="Giá khuyến mãi"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-sm-right">
                  Loại sản phẩm
                </label>
                <div className="col-12 col-sm-8 col-lg-6">
                  <select
                    className="form-control"
                    name="id_loai"
                    value={formData.id_loai}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn loại sản phẩm</option>
                    {danhsachloai.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.ten_loai}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-sm-right">
                  Ngày
                </label>
                <div className="col-12 col-sm-8 col-lg-6">
                  <input
                    className="form-control"
                    type="date"
                    name="ngay"
                    value={formData.ngay}
                    onChange={handleChange}
                    required
                    placeholder="Ngày sản phẩm"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-sm-right">
                  Hình (URL)
                </label>
                <div className="col-12 col-sm-8 col-lg-6">
                  <input
                    className="form-control"
                    type="text"
                    name="hinh"
                    value={formData.hinh}
                    onChange={handleChange}
                    required
                    placeholder="URL hình ảnh"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-sm-right">
                  Ẩn hiện
                </label>
                <div className="col-12 col-sm-8 col-lg-6">
                  <select
                    className="form-control"
                    name="an_hien"
                    value={formData.an_hien}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn ẩn hiện sản phẩm</option>
                    <option value="1">Hiện</option>
                    <option value="0">Ẩn</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-sm-right">
                  Mô tả
                </label>
                <div className="col-12 col-sm-8 col-lg-6">
                  <textarea
                    className="form-control"
                    name="mo_ta"
                    value={formData.mo_ta}
                    onChange={handleChange}
                    required
                    placeholder="Mô tả sản phẩm"
                  />
                </div>
              </div>
              <div className="form-group row text-right">
                <div className="col col-sm-10 col-lg-9 offset-sm-1 offset-lg-0">
                  <button className="btn btn-space btn-primary" type="submit">
                    Thêm sản phẩm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemSanPham;
