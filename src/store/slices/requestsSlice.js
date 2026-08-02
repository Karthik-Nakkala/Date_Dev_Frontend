import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      console.log("Payload:", action.payload);
      const newArray = state.filter((r) => r.fromUserId._id !== action.payload);
      console.log("Old length:", state.length);
      console.log("New length:", newArray.length);
      return newArray;
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
