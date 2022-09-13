import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default createAsyncThunk("products/get", async () => {
    const { data } = await axios.get("/api/products");
    return data;
});
