import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: function (state, action) {
            state.push(action.payload);
        },
        removFromCart: function (state, action) {
            return state.filter(
                (product) => product.product._id != action.payload._id
            );
        },
        udateQuantity: function (state, action) {
            console.log(action);
            state[action.payload.index].quantity =
                action.payload.updatequantity;
        },
    },
});

export const { addToCart, removFromCart, udateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
