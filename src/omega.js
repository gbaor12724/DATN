import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { themSP } from './cartSlice';
import { Link } from "react-router-dom";
import './asests/css/omega.css'; // Đảm bảo đường dẫn đúng với vị trí file CSS

function Omega() {
    const [listsp, setListSP] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Quản lý số trang hiện tại
    const productsPerPage = 8; // Số sản phẩm mỗi trang
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/donghonam/sanpham");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                // Lọc chỉ các sản phẩm có tên chứa "Omega"
                const filteredProducts = data.filter(product =>
                    product.ten_san_pham.toLowerCase().includes("omega")
                );

                setListSP(filteredProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProducts();
    }, []);

    // Tính tổng số trang
    const totalPages = Math.ceil(listsp.length / productsPerPage);

    // Lấy sản phẩm hiển thị theo trang
    const displayedProducts = listsp.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    return (
        <div className="col-md-9 canhgiua">
            <section>
                <div className="container" style={{ maxWidth: '1264px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '50px' }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                        <h3>SẢN PHẨM OMEGA</h3>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid black', margin: '0 10px' }} />
                    </div>
                    <div className="bg" style={{ width: '1230px' }}>
                        <div className="row">
                            {displayedProducts.map((product, index) => (
                                <div className="col-md-3 col-sm-12" key={index}>
                                    <div className="card">
                                        <Link to={`/chitiet/${product.ma_san_pham}`}>
                                            <img className="card-img-top" src={product.hinh} alt={product.ten_san_pham} />
                                        </Link>
                                        <p style={{ textAlign: 'center' }}>{truncateText(product.ten_san_pham, 20)}</p>
                                        <p className="product-price" style={{ textAlign: 'left', marginLeft: '14px', marginBottom: '20px' }}>
                                            Giá gốc: <span style={{ textDecoration: 'line-through', color: 'black' }}>
                                                {Number(product.Gia).toLocaleString('vi-VN')} VNĐ
                                            </span>
                                            <br />
                                            <span style={{ fontWeight: 'bold', color: 'red' }}>
                                                Giá: {Number(product.gia_giam).toLocaleString('vi-VN')} VNĐ
                                            </span>
                                        </p>

                                        <p className="product-buttons" style={{ textAlign: 'center' }}>
                                            <button onClick={() => dispatch(themSP(product))}>Thêm vào giỏ</button>
                                            {/* <button onClick={() => dispatch(themSP(product))}>Mua ngay</button> */}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Phân trang */}
                    <div className="pagination" style={{ textAlign: 'center', marginTop: '20px' }}>
                        {[...Array(totalPages)].map((_, pageIndex) => (
                            <button
                                key={pageIndex}
                                onClick={() => setCurrentPage(pageIndex + 1)}
                                style={{
                                    padding: '10px',
                                    margin: '0 5px',
                                    border: '1px solid #007BFF',
                                    backgroundColor: currentPage === pageIndex + 1 ? '#007BFF' : '#fff',
                                    color: currentPage === pageIndex + 1 ? '#fff' : '#007BFF',
                                    cursor: 'pointer',
                                }}
                            >
                                {pageIndex + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Omega;
