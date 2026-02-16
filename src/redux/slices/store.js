import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from '../slices/SidebarSlice'
import addressReducer from '../slices/MyprofileSlice'
import employeeReducer from '../slices/EmployeeSlice'
import counterReducer from '../slices/CounterSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    myprofile:addressReducer,
    user:employeeReducer,
    counter: counterReducer
  },
})
