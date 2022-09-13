import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
    'admin/get/user',
    async (id, { rejectWithValue, getState }) => {
        try {
            const {
                auth: { user },
            } = getState();
            const { data } = await axios.get(`/api/user/${id}`, {
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
