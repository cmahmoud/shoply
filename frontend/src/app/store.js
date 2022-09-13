import { configureStore } from '@reduxjs/toolkit';

import adminSlice from './slices/admin';
import authSlice from './slices/auth';
import cartSlice from './slices/cart';
import orderSlice from './slices/order';
import productSlice from './slices/product';

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
