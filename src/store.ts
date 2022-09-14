import { configureStore } from "@reduxjs/toolkit";
import todoTaskReducer from "./reducers/todoTasksSlice";
import todoStageListReducer from "./reducers/stageListReducer";
import userLoginReducer from "./reducers/getUserOps";
const store = configureStore({
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
