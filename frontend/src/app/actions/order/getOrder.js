import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
    'order/get',
    async (id, { rejectWithValue, getState }) => {
        try {
            const {
                auth: { user },
            } = getState();
            const { data } = await axios.get(`/api/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
