import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './features/userSlice'
import dataReducer from './features/data'


export const store = configureStore({
  reducer:{
    user:userReducer,
    data:dataReducer
  }
})