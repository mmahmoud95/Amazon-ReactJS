import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: function (state, action) {
            state.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        removFromCart: function (state, action) {
            const newState = state.filter(
                (product) => product.product._id != action.payload._id
            );

            // Save the updated state to localStorage
            localStorage.setItem("cart", JSON.stringify(newState));

            return newState;
        },
        udateQuantity: function (state, action) {
            // console.log(action);
            state[action.payload.index].quantity =
                action.payload.updatequantity;
            // console.log(state.length);
            localStorage.setItem("cart", JSON.stringify(state));
        },

        clearCart: function (state, action) {
            state.pop(action.payload);
        },
    },
});

export const { addToCart, removFromCart, udateQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
