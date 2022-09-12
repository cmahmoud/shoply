import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default createAsyncThunk(
    "profile/update",
    async (userData, { rejectWithValue, getState }) => {
        try {
            const {
                auth: { user },
            } = getState();
            const { data } = await axios.put("/api/user/profile", userData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
