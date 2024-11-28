import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartSlice
    },
})