import { createSlice } from "@reduxjs/toolkit";
import fetchProducts from "app/actions/products.action";
import fetchProductById from "app/actions/product.action";

const initialState = {
    list: [],
    item: {},
    loading: false,
};
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.list = [];
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchProductById.pending, (state, action) => {
            state.item = {};
            state.loading = true;
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.item = action.payload;
            state.loading = false;
        });
    },
});

export default productSlice;
