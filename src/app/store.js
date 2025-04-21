// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '../features/rooms/roomSlice';
import authReducer from '../features/auth/authSlice'; // 👈 Add this

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    auth: authReducer, // 👈 Add this
  },
});
