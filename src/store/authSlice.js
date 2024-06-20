import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedIn: false,
  userData: null,
  CurrentUserPosts: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isUserLoggedIn = true;
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.isUserLoggedIn = false;
      state.userData = null;
    },
    SetCurrentUserPosts: (state, action) => {
      state.CurrentUserPosts = action.payload;
    },
    DeleteCurrentUserPosts: (state, action) => {
      state.CurrentUserPosts = null;
    },
    updateCurrentUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

export const {
  login,
  logout,
  SetCurrentUserPosts,
  DeleteCurrentUserPosts,
  updateCurrentUserData,
} = authSlice.actions;
export default authSlice.reducer;
