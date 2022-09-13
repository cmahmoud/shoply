import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default createAsyncThunk("cart/add", async ({ id, qty }) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return { ...data, product: data._id, qty };
});
