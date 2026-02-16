import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Initialize from localStorage to prevent data loss on refresh
  employee: null,
  company_ID: localStorage.getItem("companyId") || "", 
  employeeAllData: {},
  employeeRole: localStorage.getItem("role") || ""
};

export const EmployeeSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmployeeDetails: (state, action) => {
      state.employee = action.payload;
    },
    setCompany_ID: (state, action) => {
      state.company_ID = action.payload;
      localStorage.setItem("companyId", action.payload);
    },
    setEmployeeRole: (state, action) => {
      state.employeeRole = action.payload;
      localStorage.setItem("role", action.payload);
    },
    setEmployeeAllData: (state, action) => {
      state.employeeAllData = action.payload;
      // If the employee object contains companyDetails (as per your schema)
      if (action.payload.companyDetails) {
        state.company_ID = action.payload.companyDetails;
      }
    },
    logout: (state) => {
      localStorage.clear();
      return {
        employee: null,
        company_ID: "",
        employeeAllData: {},
        employeeRole: ""
      };
    }
  },
});

export const { 
  setEmployeeDetails, 
  setCompany_ID, 
  setEmployeeAllData, 
  setEmployeeRole,
  logout 
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;