import { createSlice } from '@reduxjs/toolkit';
import { useState  } from 'react';
export const cartSlice = createSlice({
    name: 'cart',
    initialState: { listSP: [] }, 
    reducers: {
        themSP: (state, action) => {
            const sp = action.payload;
            const index = state.listSP.findIndex(s => s.id === sp.id);
            if (index === -1) {
                sp.so_luong = 1;
                state.listSP.push(sp); // false tại đây 
            } else {
                state.listSP[index].so_luong++;
            }
            console.log("Đã thêm sp. Số SP=", state.listSP.length);
        },
        
        // Thêm hành động Muasp
        Muasp: (state, action) => {
            const sp = action.payload; // Sản phẩm được thêm vào giỏ hàng
            const index = state.listSP.findIndex(s => s.id === sp.id);
            if (index === -1) { // Nếu sản phẩm chưa có trong giỏ hàng
                sp.so_luong = 1; // Khởi tạo số lượng sản phẩm là 1
                state.listSP.push(sp);
            } else {
                state.listSP[index].so_luong++; // Tăng số lượng sản phẩm
            }
            console.log("Đã mua ngay sản phẩm. Số SP=", state.listSP.length);
        },

        suaSL: (state, action) => { // Parameter is an array with id and quantity
            const id = action.payload[0];
            const so_luong = action.payload[1];
            const index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) {
                state.listSP[index].so_luong = Number(so_luong);
                console.log("Đã sửa sp", action);
            }
            console.log("Đã sửa sp ", action);
        },
        xoaSP: (state, action) => { // Parameter is id_sp
            const id = action.payload;
            const index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) state.listSP.splice(index, 1);
        },
        xoaGH: (state) => {
            state.listSP = [];
        },
        xoaHetSP: (state) => {
            state.listSP = []; // Xóa hết các sản phẩm trong giỏ hàng bằng cách thiết lập listSP là một mảng rỗng
        },
        updateProductDetails(state, action) {
            const { id, details } = action.payload;
            const index = state.listSP.findIndex(sp => sp.id === id);
            if (index !== -1) {
                state.listSP[index].details = details;
            }
        },

    } // reducers
});

export const { xoaHetSP, themSP, suaSL, xoaSP, xoaGH, updateProductDetails, Muasp } = cartSlice.actions; // Thêm Muasp vào danh sách các actions
export default cartSlice.reducer;
