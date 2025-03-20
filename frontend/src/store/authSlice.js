import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: {
    nickname: "",
    password: "",
    gender: "",
    city: "",
    selfDescription: "",
    targetDescription: [],
    interestedPosts: [],
  },
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.authUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.authUser = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.authUser = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setUser, setError, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
