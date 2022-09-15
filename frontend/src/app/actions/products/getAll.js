import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk('products/get', async (queries) => {
    const { data } = await axios.get(
        `/api/products?keyword=${queries.keyword}&page=${queries.page}`,
    );
    return data;
});
