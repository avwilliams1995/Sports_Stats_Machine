import { createSlice } from '@reduxjs/toolkit';

export const userInfoReducer = createSlice({
  name: 'userInfo',
  initialState: {
    username: '',
    password: '',
    bio: '',
  },
  reducers: {
    login: (state, action) => {
      let newState = action.payload;
      return {...state, ...newState}
    },
    editBio: (state, action) => {
      state.bio = action.payload.newBio
    },
  }
})

export const { login, editBio } = userInfoReducer.actions;
console.log(userInfoReducer.actions, userInfoReducer.reducer)
export default userInfoReducer.reducer

