import { createSlice } from "@reduxjs/toolkit";

export const todoStageList = createSlice({
  name: "todoStageList",
  initialState: {
    value: ["Backlog", "Todo", "Ongoing", "Completed"],
  },
});

export default todoStageList.reducer;
