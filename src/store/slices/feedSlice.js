import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addDevs: (state, action) => {
      return action.payload;
    },
    removeDev: (state, { payload }) => {
      const newFeed = state.filter((dev) => dev._id !== payload);
      return newFeed;
    },
  },
});

export const { addDevs, removeDev } = feedSlice.actions;
export default feedSlice.reducer;
