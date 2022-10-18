import { createSlice } from "@reduxjs/toolkit";

const userSlide = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        authToken: null,
        user: null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.authToken = action.payload.authToken;
        },
        logout(state, action) {
            state.isLoggedIn = false;
            state.user = null;
        },
        signup(state, action) {
            state.isLoggedIn = true;
            state.user.user = action.payload.user;
        },
    },
});

export const userActions = userSlide.actions;

export default userSlide;
