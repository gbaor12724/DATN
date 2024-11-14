import React, { useState } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
const HeaderLeft = ()=>{
  const [tabSanPham , setTabSanPham] = useState(false);
  const [tabloai , setTabloai] = useState(false);
  const ulSanPham = ()=>{
    setTabSanPham(!tabSanPham)
  }
  const ulLoai = ()=>{
    setTabloai(!tabloai)
  }
   return (
      <div className="be-left-sidebar">
      <div className="left-sidebar-wrapper">
        <a className="left-sidebar-toggle" href="#">
          Dashboard
        </a>
        <div className="left-sidebar-spacer">
          <div className="left-sidebar-scroll">
            <div className="left-sidebar-content">
              <ul className="sidebar-elements">
                <li className="divider">Menu</li>
                <li className="active">
                  <a href="/">
                    <i className="icon mdi mdi-home" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li className={`parent ${tabSanPham ? "open":""}`}>
                  <a href="#" onClick={ulSanPham}>
                    <i className="icon mdi mdi-view-web" />
                    <span>Sản phẩm</span>
                  </a>
                  <ul className="sub-menu">
                  <li>
                      <a href="/">Danh sách sản phẩm</a>
                    </li>
                    <li>
                      <a href="/sanphamthem">Thêm sản phẩm</a>
                    </li>
                  </ul>
                </li>
                <li className={`parent ${tabloai ? "open":""}`}>
                  <a href="#" onClick={ulLoai}>
                    <i className="icon mdi mdi-view-web" />
                    <span>Loại sản phẩm</span>
                  </a>
                  <ul className="sub-menu">
                  <li>
                      <a href="/danhsachloai">Danh sách Loại</a>
                    </li>
                    <li>
                      <a href="/themloai">Thêm Loại sản phẩm</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="progress-widget">
          <div className="progress-data">
            <span className="progress-value">60%</span>
            <span className="name">Current Project</span>
          </div>
          <div className="progress">
            <div
              className="progress-bar progress-bar-primary"
              style={{ width: "60%" }}
            />
          </div>
        </div>
      </div>
    </div>    
   )
}
export default HeaderLeft