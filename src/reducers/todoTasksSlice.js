import { createSlice } from "@reduxjs/toolkit";

export const todoTaskSlice = createSlice({
  name: "todoTasksList",
  initialState: {
    value: [
      {
        taskName: "This is Backlog",
        taskDetails: "This is backlog",
        priority: "High",
        taskStage: "0",
        deadline: "9/22/2022",
      },
      {
        taskName: "This is completed",
        taskDetails: "This a  compledted one",
        priority: "Low",
        taskStage: "3",
        deadline: "9/22/2022",
      },
    ],
  },
  reducers: {
    addTask: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    delTask: (state, action) => {
      state.value = state.value.filter(
        (element) => element["taskName"] !== action.payload
      );
    },
    changeStageTask: (state, action) => {
      state.value.forEach((element) => {
        if (element["taskName"] === action.payload.taskName) {
          element["taskStage"] = action.payload.newStage;
        }
      });
    },
  },
});

export const { addTask, delTask, changeStageTask } = todoTaskSlice.actions;

export default todoTaskSlice.reducer;
