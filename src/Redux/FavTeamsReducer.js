import { createSlice } from "@reduxjs/toolkit";

export const favTeamsReducer = createSlice({
  name: 'favTeamsReducer',
  initialState: {
    favTeams: []
  },
  reducers: {
    updateTeams: (state, action) => {
      state = action.payload
    }
  }
})

export const { updateTeams } = favTeamsReducer.actions;

export default favTeamsReducer.reducer