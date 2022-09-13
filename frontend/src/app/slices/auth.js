import { createSlice } from '@reduxjs/toolkit';

import loginAction from 'app/actions/auth/login';
import registerAction from 'app/actions/auth/register';
import getProfile from 'app/actions/user/getProfile';
import updateProfile from 'app/actions/user/updateProfile';

const initialState = {
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null,
    loading: false,
    error: null,
    profile: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null;
            state.profile = null;
            localStorage.removeItem('user');
            localStorage.removeItem('cart');
            localStorage.removeItem('payment');
            localStorage.removeItem('shippingAddress');
        },
    },
    extraReducers: (builder) => {
        // @Desc Login
        builder.addCase(loginAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(loginAction.rejected, (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = action.payload;
        });
        // @Desc Register
        builder.addCase(registerAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerAction.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(registerAction.rejected, (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = action.payload;
        });
        // @Desc Get Profile
        builder.addCase(getProfile.pending, (state, action) => {
            state.profile = null;
            state.loading = true;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.profile = null;
            state.loading = false;
            state.error = action.payload;
        });
        // @Desc Update Profile
        builder.addCase(updateProfile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.user = action.payload;
            state.profile = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { logout } = authSlice.actions;
export default authSlice;
