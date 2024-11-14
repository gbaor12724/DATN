import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: { listSP: [] }, // Initial state with empty list
    reducers: {
        themSP: (state, action) => {
            const sp = action.payload; // Assuming sp = {'id': 1, 'ten_sp': 'A'}
            const index = state.listSP.findIndex(s => s.id === sp.id);
            if (index === -1) { // Item not in cart
                sp.so_luong = 1;
                state.listSP.push(sp);
            } else {
                state.listSP[index].so_luong++;
            }
            console.log("Đã thêm sp. Số SP=", state.listSP.length);
        },
        addToCart: (state, action) => {
            const sp = action.payload; // Giả định sp = {'id': 1, 'hinh': '...', 'ten_sp': 'A', 'gia': 100}
            const index = state.listSP.findIndex(s => s.id === sp.id);
            if (index === -1) { // Item not in cart
                sp.so_luong = 1; // Đặt số lượng là 1 cho sản phẩm mới
                state.listSP.push(sp);
            } else {
                state.listSP[index].so_luong++; // Tăng số lượng sản phẩm
            }
            console.log("Đã thêm sản phẩm vào giỏ hàng. Tổng số sản phẩm =", state.listSP.length);
        },
        suaSL: (state, action) => { // Parameter is an array with id and quantity
            const id = action.payload[0];
            const so_luong = action.payload[1];
            const index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) {
                state.listSP[index].so_luong = Number(so_luong); // Cập nhật số lượng
                console.log("Đã sửa sản phẩm", action);
            }
        },
        xoaSP: (state, action) => { // Parameter is id_sp
            const id = action.payload;
            const index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) state.listSP.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
        },
        xoaGH: (state) => {
            state.listSP = []; // Xóa hết giỏ hàng
        },
        xoaHetSP: (state) => {
            state.listSP = []; // Xóa hết các sản phẩm trong giỏ hàng
        },
        updateProductDetails: (state, action) => {
            const { id, details } = action.payload;
            const index = state.listSP.findIndex(sp => sp.id === id);
            if (index !== -1) {
                state.listSP[index].details = details; // Cập nhật chi tiết sản phẩm
            }
        },
    } // reducers
});

export const { xoaHetSP, themSP, suaSL, xoaSP, xoaGH, updateProductDetails, addToCart } = cartSlice.actions; // Xuất tất cả actions
export default cartSlice.reducer; // Xuất reducer
