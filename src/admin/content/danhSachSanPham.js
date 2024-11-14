import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import '../Content/cssphantrang.css'
/* eslint-disable jsx-a11y/anchor-is-valid */
const DanhSachSanPham = () => {
   const [tatcaSanPham, setTatCaSanPham] = useState([]);
   const [currentPage, setCurrentPage] = useState(0);
   const ITEMS_PER_PAGE = 10;
 
   useEffect(() => {
     const fetchTatCaSanPham = async () => {
       try {
         const response = await fetch('http://localhost:3000/tatcasanpham');
         const data = await response.json();
         setTatCaSanPham(data);
       } catch (error) {
         console.error("Error fetching products:", error);
       }
     };
     fetchTatCaSanPham();
   }, []);
 
   const handlePageClick = (event) => {
     setCurrentPage(event.selected);
   };
 
   const startIndex = currentPage * ITEMS_PER_PAGE;
   const endIndex = startIndex + ITEMS_PER_PAGE;
   const currentProducts = tatcaSanPham.slice(startIndex, endIndex);
   const pageCount = Math.ceil(tatcaSanPham.length / ITEMS_PER_PAGE);
 


   /* Xóa sản phẩm*/

   const xoasp = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/xoasanpham/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
         alert(`xóa sản phẩm có ma_san_pham ${id} Thành công`)
          setTatCaSanPham(prevProducts => prevProducts.filter(product => product.id !== id));
        } else {
          const errorData = await response.json();
          console.error("Error deleting product:", errorData);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };



  /* sửa sản phẩm */
  // lấy ra danh sách loại để show dữ liệu lên 
  const [danhsachloai , setDanhSachLoai] = useState([]);
  
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
    // lấy sản phẩm cần sửa 
    const [formData, setFormData] = useState({
      id: "",
      ten_sp: "",
      gia: "",
      gia_km: "",
      id_loai: "",
      ngay: "",
      hinh: "",
      an_hien: "",
      mo_ta: ""
    });
    
    const chonsanphamsua = (id, ten_sp, gia, gia_km, id_loai, ngay, hinh, an_hien, mo_ta) => {
      setFormData({
        id,
        ten_sp,
        gia,
        gia_km,
        id_loai,
        ngay,
        hinh,
        an_hien,
        mo_ta
      });
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
  const handleSubmit = async () => {
    console.log('Tiến hành sửa');
    const apiUrl = 'http://localhost:3000/suasanpham';    
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT', // Sử dụng PUT để cập nhật
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert('Sửa sản phẩm thành công');
        setTatCaSanPham(prevState =>
          prevState.map(product =>
            product.id === formData.id ? { ...product, ...formData } : product
          )
        );
      } else {
        const error = await response.json();
        alert(`Có lỗi khi sửa sản phẩm: ${error.thongbao}`);
      }
    } catch (error) {
      alert('Lỗi gọi API: ' + error.message);
    }
  };
    

  return (
    <>
     <div className="card card-table" style={{ width: "1305px", float: "right", margin: "20px 0px" }}>
       <div className="card-header">
         Danh sách Sản phẩm
         <div className="tools dropdown">
           <span className="icon mdi mdi-download" />
           <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
             <span className="icon mdi mdi-more-vert" />
           </a>
           <div className="dropdown-menu" role="menu">
             <a className="dropdown-item" href="#">Action</a>
             <a className="dropdown-item" href="#">Another action</a>
             <a className="dropdown-item" href="#">Something else here</a>
             <div className="dropdown-divider" />
             <a className="dropdown-item" href="#">Separated link</a>
           </div>
         </div>
       </div>
       <div className="card-body">
         <table className="table table-striped table-hover">
           <thead>
             <tr>
               <th style={{ width: "40%" }}>Sản phẩm</th>
               <th style={{ width: "20%" }}>Giá</th>
               <th>Giá KM</th>
               <th>Ngày</th>
               <th>Lượt xem</th>
               <th className="actions" />
             </tr>
           </thead>
           <tbody>
              {currentProducts.map(product => (
                <tr key={product.id}>
                  <td className="user-avatar">
                    <img src={product.hinh} alt="Avatar" />
                    {product.ten_sp}
                  </td>
                  <td>{product.gia.toLocaleString()}</td>
                  <td>{product.gia_km.toLocaleString()}</td>
                  <td>{new Date(product.ngay).toLocaleDateString()}</td>
                  <td>{product.luot_xem} <i className="mdi mdi-eye"></i></td>
                  <td className="actions">
                    <span href="#" className="icon" data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
                    onClick={()=>chonsanphamsua(
                      product.id,
                      product.ten_sp,
                      product.gia,
                      product.gia_km,
                      product.id_loai,
                      product.ngay,
                      product.hinh,
                      product.an_hien,
                      product.mo_ta,
                    )}>
                      <i className="mdi mdi-edit" />
                    </span>
                    <span>&nbsp;&nbsp;</span> 
                    <a className="icon" href="#" onClick={() => xoasp(product.id)}>
                      <i className="mdi mdi-delete" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>

         </table>
         <ReactPaginate
           previousLabel={"Previous"}
           nextLabel={"Next"}
           breakLabel={"..."}
           breakClassName={"break-me"}
           pageCount={pageCount}
           marginPagesDisplayed={2}
           pageRangeDisplayed={5}
           onPageChange={handlePageClick}
           containerClassName={"pagination"}
           activeClassName={"active"}
         />
       </div>
     </div>
    {/* popup */}
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Sửa sản phẩm {formData.ten_sp}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="form-group row">
              <label className="col-12 col-sm-3 col-form-label text-sm-right" htmlFor="ten_sp">Tên sản phẩm</label>
              <div className="col-12 col-sm-8 col-lg-6">
                <input className="form-control" id="ten_sp" name="ten_sp" type="text" value={formData.ten_sp} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-12 col-sm-3 col-form-label text-sm-right" htmlFor="gia">Giá sản phẩm</label>
              <div className="col-12 col-sm-8 col-lg-6">
                <input className="form-control" id="gia" name="gia" type="text" value={formData.gia} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-12 col-sm-3 col-form-label text-sm-right" htmlFor="gia_km">Giá khuyến mãi</label>
              <div className="col-12 col-sm-8 col-lg-6">
                <input className="form-control" id="gia_km" name="gia_km" type="text" value={formData.gia_km} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-12 col-sm-3 col-form-label text-sm-right">Loại sản phẩm</label>
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
              <label className="col-12 col-sm-3 col-form-label text-sm-right">Ẩn hiện</label>
              <div className="col-12 col-sm-8 col-lg-6">
                <select
                  className="form-control"
                  name="an_hien"
                  value={formData.an_hien}
                  onChange={handleChange}
                  required
                >
                  <option value="1">Hiện</option>
                  <option value="0">Ẩn</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-12 col-sm-3 col-form-label text-sm-right" htmlFor="hinh">Hình</label>
              <div className="col-12 col-sm-8 col-lg-6">
                <input className="form-control" id="hinh" name="hinh" type="text" value={formData.hinh} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-12 col-sm-3 col-form-label text-sm-right">Mô tả</label>
              <div className="col-12 col-sm-8 col-lg-6">
                <textarea
                  className="form-control"
                  name="mo_ta"
                  value={formData.mo_ta || ""}
                  onChange={handleChange}
                  required
                  placeholder="Mô tả sản phẩm"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary dark" data-bs-dismiss="modal">Đóng</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Hoàn tất</button>
          </div>
        </div>
      </div>
    </div>
    </>
   );
 };
 
 export default DanhSachSanPham;
