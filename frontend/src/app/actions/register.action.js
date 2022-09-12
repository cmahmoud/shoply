import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default createAsyncThunk(
    "user/register",
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/user/register", user);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
