import { createSlice } from '@reduxjs/toolkit';

import addItem from 'app/actions/cart/addItem';

const items = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const shippingAddress = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const payment = localStorage.getItem('payment')
    ? JSON.parse(localStorage.getItem('payment'))
    : {};

const initialState = {
    items,
    shippingAddress,
    payment,
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeCartItems: (state, action) => {
            state.items = [];
            localStorage.removeItem('cart');
        },
        removeItemFromCart: (state, action) => {
            state.items = state.items.filter(
                (x) => x.product !== action.payload,
            );
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        addShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem(
                'shippingAddress',
                JSON.stringify(state.shippingAddress),
            );
        },
        addPaymentMethod: (state, action) => {
            state.payment = action.payload;
            localStorage.setItem('payment', JSON.stringify(state.payment));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addItem.pending, (state, action) => {
            state.items = [...state.items];
        });
        builder.addCase(addItem.fulfilled, (state, action) => {
            const item = action.payload;
            const isExist = state.items.find((x) => x.product === item.product);
            if (isExist) {
                state.items = state.items.map((x) =>
                    x.product === item.product ? item : x,
                );
            } else {
                state.items.push(item);
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        });
    },
});

export const { removeItemFromCart, addShippingAddress, addPaymentMethod } =
    cartSlice.actions;

export default cartSlice;
