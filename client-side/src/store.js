import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./features/favoriteSlice";

const store = configureStore({
    reducer: {
        favorites: favoriteReducer,
    }
})

export default store;