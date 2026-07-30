import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addDevs:(state,action)=>{
            return action.payload;
        }
    }
});

export const {addDevs} = feedSlice.actions;
export default feedSlice.reducer;