import { createSlice } from '@reduxjs/toolkit';

import deleteProduct from 'app/actions/products/deleteProduct';
import getAllProducts from 'app/actions/products/getAll';
import getProductById from 'app/actions/products/getById';

const initialState = {
    list: [],
    item: {},
    loading: false,
};
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.list = [];
            state.loading = true;
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        });
        builder.addCase(getProductById.pending, (state, action) => {
            state.item = {};
            state.loading = true;
        });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.item = action.payload;
            state.loading = false;
        });
        /// delete product
        builder.addCase(deleteProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
            state.list = state.list.filter((x) => x._id !== payload.id);
            state.error = null;
            state.loading = false;
        });
        builder.addCase(deleteProduct.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        });
    },
});

export default productSlice;
