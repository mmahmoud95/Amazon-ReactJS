import { createSlice } from "@reduxjs/toolkit";

const  counterSlice=createSlice({
    name:'counter',
    initialState:{counter:1},
    reducers:{
        increaseCounter:function(state,action){
            state.counter=state.counter+1
        },
        deccreaseCounter:function(state,action){
            state.counter=state.counter-1
            // return state.counter.filter((product)=>product._id!=action.payload.counter._id-1)

        },
    }
})
 export const {increaseCounter,deccreaseCounter}=counterSlice.actions
export default counterSlice.reducer
