import { createSlice } from "@reduxjs/toolkit";
import loginAction from "app/actions/login.action";
import profileDataAction from "app/actions/profileData.action";
import registerAction from "app/actions/register.action";
import updateProfileAction from "app/actions/updateProfile.action";

const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    loading: false,
    error: null,
    profile: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null;
            localStorage.removeItem("user");
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
            localStorage.setItem("user", JSON.stringify(action.payload));
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
            localStorage.setItem("user", JSON.stringify(action.payload));
        });
        builder.addCase(registerAction.rejected, (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = action.payload;
        });
        // @Desc Get Profile
        builder.addCase(profileDataAction.pending, (state, action) => {
            state.profile = null;
            state.loading = true;
        });
        builder.addCase(profileDataAction.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(profileDataAction.rejected, (state, action) => {
            state.profile = null;
            state.loading = false;
            state.error = action.payload;
        });
        // @Desc Update Profile
        builder.addCase(updateProfileAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateProfileAction.fulfilled, (state, action) => {
            state.user = action.payload;
            state.profile = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem("user", JSON.stringify(action.payload));
        });
        builder.addCase(updateProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { logout } = authSlice.actions;
export default authSlice;
