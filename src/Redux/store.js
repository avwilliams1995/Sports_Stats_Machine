import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './userInfoReducer';
import isLoggedIn from './isLoggedIn';
import { favTeamsReducer } from './FavTeamsReducer';

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    isLoggedIn: isLoggedIn,
    favTeams: favTeamsReducer,
  }
})