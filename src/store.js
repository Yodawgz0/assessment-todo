import { configureStore } from "@reduxjs/toolkit";
import todoTaskReducer from "./reducers/todoTasksSlice";
import todoStageListReducer from "./reducers/stageListReducer";
import userLoginReducer from "./reducers/getUserOps";
export default configureStore({
  reducer: {
    todotaskHandler: todoTaskReducer,
    todoStageConst: todoStageListReducer,
    userLoginAPI: userLoginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
