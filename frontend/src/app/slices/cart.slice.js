import { createSlice } from "@reduxjs/toolkit";
import addItemToCart from "app/actions/addToCart.action";

const initialState = {
    items: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        removeItemFromCart: (state, action) => {
            state.items = state.items.filter(
                (x) => x.product !== action.payload
            );
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.pending, (state, action) => {
            state.items = [...state.items];
        });
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            const item = action.payload;
            const isExist = state.items.find((x) => x.product === item.product);
            if (isExist) {
                state.items = state.items.map((x) =>
                    x.product === item.product ? item : x
                );
            } else {
                state.items.push(item);
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        });
    },
});

export const { removeItemFromCart } = cartSlice.actions;

export default cartSlice;
