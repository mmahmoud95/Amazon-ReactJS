import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Slice/Cart";
export const store=configureStore({
    reducer:{
        Cart:CartReducer,
    }
 })

