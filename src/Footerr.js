import React from 'react';
import logo from './images/logo.png';
const Footer = () => {
    return (
        
        <footer>
            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr>
                        <td width="50%"></td>
                        <th width="25%">Thông Tin Liên Hệ</th>
                        <th width="25%">Điều Hướng</th>
                    </tr>
                    <tr>
                        <td rowSpan="3">
                        <img src={logo} width="350px" height="120px" style={{ marginLeft: '200px' }} alt="Logo" />                        </td>
                        <td>273 An Dương Vương, P4, Q5, TP.HCM</td>
                        <td>
                            <a href="index.html" style={{ color: 'black' }}>Trang Chủ</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Fax: 0272.123.121</td>
                        <td>
                            <a href="donghonam.html" style={{ color: 'black' }}>Đồng Hồ Nam</a>
                        </td>
                    </tr>
                    <tr>
                        <td>SĐT: 0823.456.789</td>
                        <td>
                            <a href="donghonu.html" style={{ color: 'black' }}>Đồng Hồ Nữ</a>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Gmail: 3TWatch@gmail.com</td>
                        <td>
                            <a href='form/contact.html' style={{ color: 'black' }}>Góp Ý</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </footer>
    );
};

export default Footer;
