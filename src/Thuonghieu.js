import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ThuongHieu() {
    const [thuongHieuList, setThuongHieuList] = useState([]);

    useEffect(() => {
        const fetchThuongHieu = async () => {
            try {
                const response = await fetch("http://localhost:3000/donghonam/thuonghieu"); // API lấy danh sách thương hiệu
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setThuongHieuList(data);
            } catch (error) {
                console.error("Error fetching brand data:", error);
            }
        };

        fetchThuongHieu();
    }, []);

    return (
        <div className="dropdown">
            <a style={{ borderColor: '#EEEEEE', backgroundColor: '#EEEEEE' }} className="dropdown-toggle" data-toggle="dropdown" href="#/">THƯƠNG HIỆU <span className="caret"></span></a>
            <ul className="dropdown-menu">
                {thuongHieuList.map((brand) => (
                    <li key={brand.ma_thuong_hieu}>
                        <Link to={`/sanpham?brand=${brand.ma_thuong_hieu}`}>{brand.ten_thuong_hieu}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ThuongHieu;
