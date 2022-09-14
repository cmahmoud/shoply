import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
    'admin/create/product',
    async (product, { rejectWithValue, getState }) => {
        try {
            const {
                auth: { user },
            } = getState();
            const { data } = await axios.post(
                '/api/products/',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
