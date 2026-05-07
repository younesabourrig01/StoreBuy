import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (userId) => {
    // const response = await fetch(`/api/notifications/${userId}`);
    // return await response.json();
    return [
      { id: 1, title: 'Welcome!', message: 'Thanks for joining StoreBuy!', date: '2026-05-01', read: true },
      { id: 2, title: 'Order Update', message: 'Your order ORD-456 is now processing.', date: '2026-05-06', read: false }
    ]; // Mock data
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    markAsRead: (state, action) => {
      const note = state.items.find(n => n.id === action.payload);
      if (note) note.read = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      });
  },
});

export const { markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
