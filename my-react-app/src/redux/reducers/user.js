import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    // Define initial state for the user reducer
};


export const userReducer = createReducer(initialState, {

    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },


});
