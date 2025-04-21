import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialRooms } from '../../roomList';

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const API_URL = 'https://your-api-url.com/rooms'; // replace when ready

  try {
    const res = await fetch(API_URL);

    // If API doesn't respond or returns something bad
    if (!res.ok) throw new Error('API error');

    const data = await res.json();

    // If data is not array or empty, fallback
    if (!Array.isArray(data) || data.length === 0) {
      return initialRooms;
    }

    return data;
  } catch (error) {
    console.warn('API failed, using dummy data:', error.message);
    return initialRooms;
  }
});

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    addRoom: (state, action) => {
      state.list.push(action.payload);
    },
    deleteRoom: (state, action) => {
      state.list = state.list.filter(room => room.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.loading = false;
        state.error = 'Could not load rooms.';
      });
  },
});

export const { addRoom, deleteRoom } = roomSlice.actions;
export default roomSlice.reducer;
