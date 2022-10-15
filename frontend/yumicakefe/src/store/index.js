import { configureStore } from "@reduxjs/toolkit";
import cartSlide from "./cart-slice";
import userSlide from "./user-slice";

import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        cart: cartSlide.reducer,
        user: userSlide.reducer,
    },
});

export default store;
