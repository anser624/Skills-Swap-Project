import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null
}

export const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        info: (state,action)=>{
            state.user = action.payload
        },
        remove:(state,action)=>{
            state.user = null
        }
    }
})

export const {info,remove} = userSlice.actions;

export default userSlice.reducer;