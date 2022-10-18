import { createSlice } from "@reduxjs/toolkit";

const searchSlide = createSlice({
    name: "search",
    initialState: { searchInfo: null, searchByCategory: null },
    reducers: {
        setSearch(state, action) {
            state.searchInfo = action.payload.searchInfo;
            state.searchByCategory = null;
        },
        setCategory(state, action) {
            state.searchByCategory = action.payload.searchByCategory;
            state.searchInfo = null;
        },

        setSearchFalse(state) {
            state.searchByCategory = null;
            state.searchInfo = null;
        },
    },
});

export const searchActions = searchSlide.actions;

export default searchSlide;
