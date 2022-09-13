import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
    'admin/update/user',
    async (newData, { rejectWithValue, getState }) => {
        try {
            const {
                auth: { user },
            } = getState();
            const { data } = await axios.put(
                `/api/user/${newData.id}/`,
                newData,
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
