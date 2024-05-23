import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";

const store=configureStore({
    reducer:authReducer,
    //Todo: add more slices here for posts
})

export default store;