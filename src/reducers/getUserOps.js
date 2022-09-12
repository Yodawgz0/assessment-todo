import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loginToken: "",
  status: "",
  error: "",
};

export const userLogIn = createAsyncThunk("user/LogIn", async (loginVals) => {
  const response = await axios.post(
    "https://api-nodejs-todolist.herokuapp.com/user/login",
    loginVals,
    { headers: { "Content-Type": "application/json" } }
  );
  return response;
});

const userSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    // omit reducer cases
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogIn.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogIn.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.loginToken = action.payload.data.token;
        state.status = "idle";
        localStorage.setItem("sessionkey", state.loginToken);
      })
      .addCase(userLogIn.rejected, (state, action) => {
        state.status = "Error";
        console.log(action);
      });
  },
});

export default userSlice.reducer;
