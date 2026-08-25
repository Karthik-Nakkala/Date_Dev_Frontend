import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addUser:(state,action)=>{
            return action.payload;
        },
        addPremium:(state,action)=>{
            state.isPremium=action.payload;
        },
        removeUser:()=>{
            return null;
        }
    }
});

export const {addUser,addPremium,removeUser}=userSlice.actions;
export default userSlice.reducer;