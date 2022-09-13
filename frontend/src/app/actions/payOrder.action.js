import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default createAsyncThunk(
    "order/pay",
    async (id, { rejectWithValue, getState }) => {
        try {
            const {
                auth: { user },
            } = getState();
            const { data } = await axios.put(
                `/api/order/${id}/pay`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
