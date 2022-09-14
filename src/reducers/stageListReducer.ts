import { createSlice } from "@reduxjs/toolkit";

interface todoStageListState {
  value: string[];
}

const initialState: todoStageListState = {
  value: ["Backlog", "Todo", "Ongoing", "Completed"],
};
export const todoStageList = createSlice({
  name: "todoStageList",
  initialState,
  reducers: {},
});

export default todoStageList.reducer;
