// Make store using redux toolkit

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		// add more Reducers for posts
	},
});

export default store;
