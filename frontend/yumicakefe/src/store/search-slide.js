import { createSlice } from "@reduxjs/toolkit";

const searchSlide = createSlice({
    name: "search",
    initialState: { searchInfo: null, isSearch: false },
    reducers: {
        setSearch(state, action) {
            state.searchInfo = action.payload.searchInfo;
            state.isSearch = true;
        },

        setSearchFalse(state) {
            state.isSearch = false;
            state.searchInfo = null;
        },
    },
});

export const searchActions = searchSlide.actions;

export default searchSlide;
