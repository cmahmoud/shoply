import { createSlice } from "@reduxjs/toolkit";
import orderItemAction from "app/actions/createOrderItem.action";
import getOrderDataAction from "app/actions/getOrderData.action";
import getUserOrdersAction from "app/actions/getUserOrders.action";
import payOrderAction from "app/actions/payOrder.action";

const initialState = {
    order: null,
    items: [],
    loading: false,
    error: null,
};
const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(orderItemAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(orderItemAction.fulfilled, (state, action) => {
            state.order = action.payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(orderItemAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        // get single order
        builder.addCase(getOrderDataAction.pending, (state, action) => {
            state.order = null;
            state.loading = true;
        });
        builder.addCase(getOrderDataAction.fulfilled, (state, action) => {
            state.order = action.payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(getOrderDataAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        // pay order
        builder.addCase(payOrderAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(payOrderAction.fulfilled, (state, action) => {
            state.order = { ...state.order, ...action.payload };
            state.error = null;
            state.loading = false;
        });
        builder.addCase(payOrderAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        // get user orders
        builder.addCase(getUserOrdersAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserOrdersAction.fulfilled, (state, action) => {
            state.items = action.payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(getUserOrdersAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export default orderSlice;
