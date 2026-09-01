import { createReducer } from "@reduxjs/toolkit"; // or createSlice

const initialState = {
    isLoading: true,
};

export const shopReducer = createReducer(initialState, {});

export default shopReducer;