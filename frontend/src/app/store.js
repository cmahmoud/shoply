import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/product";
import cartSlice from "./slices/cart";
import authSlice from "./slices/auth";
import orderSlice from "./slices/order";
import adminSlice from "./slices/admin";

const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        auth: authSlice.reducer,
        orders: orderSlice.reducer,
        admin: adminSlice.reducer,
    },
});

export default store;
