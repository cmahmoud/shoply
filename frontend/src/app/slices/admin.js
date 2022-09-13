import { createSlice } from '@reduxjs/toolkit';

import deleteUser from 'app/actions/admin/deleteUser';
import getUsers from 'app/actions/admin/getUsers';

const initialState = {
    users: null,
    loading: false,
    error: null,
};
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
        builder.addCase(deleteUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter(
                (user) => user._id !== action.payload.id,
            );
            state.error = null;
            state.loading = false;
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});
export default adminSlice;
