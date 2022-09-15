import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk('products/get', async (keyword = '') => {
    const { data } = await axios.get(`/api/products?keyword=${keyword}`);
    return data;
});
