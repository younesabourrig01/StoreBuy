import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId) => {
    // const response = await fetch(`/api/orders/user/${userId}`);
    // return await response.json();
    return [
      { id: 'ORD-123', date: '2026-05-01', total: 125.99, status: 'Delivered', items: 3 },
      { id: 'ORD-456', date: '2026-05-06', total: 45.00, status: 'Processing', items: 1 }
    ]; // Mock data
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  },
});

export default orderSlice.reducer;
