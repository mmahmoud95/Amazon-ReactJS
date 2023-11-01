import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Slice/Cart";
import countReducer from "./Slice/count";
export const store=configureStore({
    reducer:{
        Cart:CartReducer,
        counter:countReducer
    }
 })

