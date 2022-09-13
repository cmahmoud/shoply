import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk('product/get', async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
});
