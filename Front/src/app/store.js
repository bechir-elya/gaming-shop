import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shopSlice";
import userReducer from "../features/userSlice";

export default configureStore({
    reducer: {
        shop: shopReducer,
        user: userReducer
    }
})