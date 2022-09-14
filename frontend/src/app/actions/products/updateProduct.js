import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
    'admin/update/product',
    async (product, { rejectWithValue, getState }) => {
        try {
            const {
                auth: { user },
            } = getState();
            const { data } = await axios.put(
                `/api/products/${product.id}/update`,
                product,
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
