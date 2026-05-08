import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId) => {
    // const response = await fetch(`/api/orders/user/${userId}`);
    // return await response.json();
    return [
      { id: 'ORD-123', userId: 'user1', date: '2026-05-01', total: 125.99, status: 'Delivered', items: 3 },
      { id: 'ORD-456', userId: 'user1', date: '2026-05-06', total: 45.00, status: 'Processing', items: 1 }
    ]; // Mock data
  }
);

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async () => {
    // const response = await fetch('/api/orders/all');
    // return await response.json();
    return [
      { id: 'ORD-123', userId: 'user1', userName: 'John Doe', date: '2026-05-01', total: 125.99, status: 'Delivered', items: 3 },
      { id: 'ORD-456', userId: 'user1', userName: 'John Doe', date: '2026-05-06', total: 45.00, status: 'Processing', items: 1 },
      { id: 'ORD-789', userId: 'user2', userName: 'Jane Smith', date: '2026-05-07', total: 89.50, status: 'Shipped', items: 2 },
      { id: 'ORD-101', userId: 'user3', userName: 'Bob Johnson', date: '2026-05-08', total: 210.00, status: 'Processing', items: 5 }
    ]; // Mock data for all users
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    allOrders: [], // New state for admin
    status: 'idle',
    adminStatus: 'idle',
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
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.adminStatus = 'loading';
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.adminStatus = 'succeeded';
        state.allOrders = action.payload;
      });
  },
});

export default orderSlice.reducer;
