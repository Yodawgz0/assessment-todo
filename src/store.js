import { configureStore } from "@reduxjs/toolkit";
import todoTaskReducer from "./reducers/todoTasksSlice";
import todoStageListReducer from "./reducers/stageListReducer";

export default configureStore({
  reducer: {
    todotaskHandler: todoTaskReducer,
    todoStageConst: todoStageListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
