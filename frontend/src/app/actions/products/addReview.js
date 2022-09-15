import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import getById from './getById';

export default createAsyncThunk(
    'user/add/review',
    async (review, { rejectWithValue, getState, dispatch }) => {
        try {
            const {
                auth: { user },
            } = getState();
            const { data } = await axios.post(
                `/api/products/${review.id}/review`,
                review,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            );
            dispatch(getById(review.id));
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
