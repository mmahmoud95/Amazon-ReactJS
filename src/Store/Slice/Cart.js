import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const totalPriceAction = createAsyncThunk(
    "totalPriceAction",
    async () => {
        try {
            const res = await axios.get("http://localhost:3333/cart", {
                headers: {
                    Authorization: localStorage.getItem("userToken"),
                },
            });
            console.log(res.data.numOfCartItems);
            return res.data.numOfCartItems;
        } catch {
            return 1;
        }
    }
);
export const cartSlice = createSlice({
    name: "cart",
    initialState: { cart: [], totalPrice: 0 },
    extraReducers: (builder) => {
        builder.addCase(totalPriceAction.fulfilled, (state, action) => {
            state.totalPrice = action.payload;
        });
    },
    reducers: {
        addToCart: function (state, action) {
            state.cart.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        removFromCart: function (state, action) {
            const newState = state.cart.filter(
                (product) => product.product._id !== action.payload._id
            );
            console.log(newState);
            // Save the updated state to localStorage
            localStorage.setItem("cart", JSON.stringify(newState));

            // Update the state using Immer's draft
            state.cart.splice(0, state.cart.length, ...newState);
        },
        udateQuantity: function (state, action) {
            // console.log(action);
            state.cart[action.payload.index].quantity =
                action.payload.updatequantity;
            // console.log(state.length);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        clearCart: function (state, action) {
            state.cart = [];
        },
    },
});

export const { addToCart, removFromCart, udateQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
