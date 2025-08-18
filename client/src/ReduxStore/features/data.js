import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        items: [],
        status: "idle",
        error: null
    },
    reducers: {
        setData: (state, action) => {
            state.items = action.payload;
            console.log("Data set successfully");
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { setData, setError } = dataSlice.actions;

export default dataSlice.reducer;