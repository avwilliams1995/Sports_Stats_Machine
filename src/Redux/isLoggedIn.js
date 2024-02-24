import { create } from '@mui/material/styles/createTransitions';
import { createSlice } from '@reduxjs/toolkit';

export const isLoggedIn = createSlice({
  name: 'isLoggedIn',
  initialState: {
    status: false
  },
  reducers: {
    confirmedLogin: (state, action) => {
      state.status = action.payload
    }
  }
})

export const { confirmedLogin } = isLoggedIn.actions;

export default isLoggedIn.reducer