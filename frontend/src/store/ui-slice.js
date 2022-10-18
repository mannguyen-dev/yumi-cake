import { createSlice } from "@reduxjs/toolkit";

const uiSlide = createSlice({
    name: "ui",
    initialState: { cartIsVisible: false, showUserPage: false, showLogin: false },
    reducers: {
        showCart(state) {
            state.showLogin = false;
            state.showUserPage = false;
            state.cartIsVisible = !state.cartIsVisible;
        },

        showUserPage(state) {
            state.showLogin = false;
            state.showUserPage = !state.showUserPage;
            state.cartIsVisible = false;
        },

        showLogin(state) {
            state.showLogin = !state.showLogin;
            state.showUserPage = false;
            state.cartIsVisible = false;
        },
        setUnvisible(state) {
            state.showLogin = false;
            state.showUserPage = false;
            state.cartIsVisible = false;
        },
    },
});

export const uiActions = uiSlide.actions;

export default uiSlide;
