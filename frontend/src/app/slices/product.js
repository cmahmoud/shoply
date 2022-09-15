import { createSlice } from '@reduxjs/toolkit';

import addReview from 'app/actions/products/addReview';
import createProduct from 'app/actions/products/createProduct';
import deleteProduct from 'app/actions/products/deleteProduct';
import getAllProducts from 'app/actions/products/getAll';
import getProductById from 'app/actions/products/getById';
import updateProduct from 'app/actions/products/updateProduct';
import uploadImage from 'app/actions/products/uploadImage';

const initialState = {
    list: [],
    item: {},
    loading: false,
    error: null,
    page: null,
    pages: null,
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
        builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
            state.list = payload.products;
            state.page = payload.page;
            state.pages = payload.pages;
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
        /// create product
        builder.addCase(createProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createProduct.fulfilled, (state, { payload }) => {
            state.list.unshift(payload);
            state.item = payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(createProduct.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        });
        /// update product
        builder.addCase(updateProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
            state.list = state.list.map((x) =>
                x._id === payload._id ? payload : x,
            );
            state.item = payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(updateProduct.rejected, (state, { payload }) => {
            state.error = payload;
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
        /// upload product image
        builder.addCase(uploadImage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(uploadImage.fulfilled, (state, { payload }) => {
            state.item.image = payload.image;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(uploadImage.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        });
        /// add revie
        builder.addCase(addReview.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addReview.fulfilled, (state, { payload }) => {
            state.loading = false;
        });
        builder.addCase(addReview.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        });
    },
});

export default productSlice;
