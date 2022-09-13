import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
    'order/create',
    async (order, { rejectWithValue, getState }) => {
        try {
            const {
                auth: { user },
            } = getState();
            const { data } = await axios.post('/api/order/', order, {
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
