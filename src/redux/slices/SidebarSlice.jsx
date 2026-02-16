import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: true,
  second_sidebar: false,
  LeaveModal: false,
  editEmployeeModal : false
};

export const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
    setSecondSidebar: (state, action) => {
      state.second_sidebar = action.payload;
    },
    setShowLeaveModal: (state, action) => {
      state.LeaveModal = action.payload;
    },
    setModal: (state,action)=>{
      state.editEmployeeModal = action.payload
    },
    setCandidateModal:(state,action)=>{
      state.editCandidateModal = action.payload
    }

  },
});

export const { setSidebar, setSecondSidebar, setShowLeaveModal,setModal,setCandidateModal } =
  SidebarSlice.actions;

export default SidebarSlice.reducer;
