import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../services/axios/instance";

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
        // removFromCart: function (state, action) {
        //     // Make the API call to remove the item
        //     instance.delete(`/cart/${action.payload._id}`, {
        //       headers: {
        //         Authorization: localStorage.getItem("userToken"),
        //       },
        //     })
        //       .then((response) => {
        //         if (response.status === 201) {
        //           // If the deletion is successful, update the local state
        //           return state.filter(
        //             (product) => product.product._id !== action.payload._id
        //           );
        //         } else {
        //           // Handle the case when the API call doesn't return status 200
        //           console.error("Failed to remove item from API");
        //           return state; // Return the state unchanged
        //         }
        //       })
        //       .catch((error) => {
        //         console.error("Error while removing item from API:", error);
        //         return state; // Return the state unchanged
        //       });
        //   },
          
        udateQuantity: function (state, action) {
            console.log(action);
            state[action.payload.index].quantity =
                action.payload.updatequantity;
        },
    },
});

export const { addToCart, removFromCart, udateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
