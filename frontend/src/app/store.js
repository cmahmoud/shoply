import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/product.slice";
import cartSlice from "./slices/cart.slice";
import authSlice from "./slices/auth.slice";
import orderSlice from "./slices/order.slice";
import adminSlice from "./slices/admin.slice";

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
