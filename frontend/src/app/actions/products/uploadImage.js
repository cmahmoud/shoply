import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
    'admin/upload/product/image',
    async (image, { rejectWithValue, getState }) => {
        try {
            const { data } = await axios.post('/api/upload/', image, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
