import { createSlice } from '@reduxjs/toolkit';

import createOrder from 'app/actions/order/createOrder';
import deliverOrder from 'app/actions/order/deliverOrder';
import getOrder from 'app/actions/order/getOrder';
import payOrder from 'app/actions/order/payOrder';
import getOrders from 'app/actions/user/getOrders';

const initialState = {
    order: null,
    items: [],
    loading: false,
    error: null,
};
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.order = action.payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        // get single order
        builder.addCase(getOrder.pending, (state, action) => {
            state.order = null;
            state.loading = true;
        });
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.order = action.payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(getOrder.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        // pay order
        builder.addCase(payOrder.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(payOrder.fulfilled, (state, action) => {
            state.order = { ...state.order, ...action.payload };
            state.error = null;
            state.loading = false;
        });
        builder.addCase(payOrder.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        // get user orders
        builder.addCase(getOrders.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.items = action.payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(getOrders.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        /// deliver Order
        builder.addCase(deliverOrder.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deliverOrder.fulfilled, (state, { payload }) => {
            state.order = payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(deliverOrder.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        });
    },
});

export default orderSlice;
