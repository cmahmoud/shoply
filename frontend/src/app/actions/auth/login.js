import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
    'user/login',
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/user/login', user);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
