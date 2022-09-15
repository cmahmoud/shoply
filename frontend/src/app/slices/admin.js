import { createSlice } from '@reduxjs/toolkit';

import deleteUser from 'app/actions/admin/deleteUser';
import getOrders from 'app/actions/admin/getOrders';
import getUser from 'app/actions/admin/getUser';
import getUsers from 'app/actions/admin/getUsers';
import updateUser from 'app/actions/admin/updateUser';

const initialState = {
    users: null,
    user: null,
    orders: null,
    order: null,
    loading: false,
    error: null,
};
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        /// get all users
        builder.addCase(getUsers.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        /// get single user
        builder.addCase(getUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        /// update user
        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(updateUser.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        });
        /// delete user
        builder.addCase(deleteUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
            state.users = state.users.filter((user) => user._id !== payload.id);
            state.error = null;
            state.loading = false;
        });
        builder.addCase(deleteUser.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        });
        /// get Orders
        builder.addCase(getOrders.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getOrders.fulfilled, (state, { payload }) => {
            state.orders = payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(getOrders.rejected, (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        });
    },
});
export default adminSlice;
