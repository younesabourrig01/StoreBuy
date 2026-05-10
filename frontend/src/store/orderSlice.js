import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/apiConfig';
import toast from 'react-hot-toast';
import { resetCartLocal } from './cartSlice'; 

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/user/orders');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/user/orders');
      if (response.data.status === 'success' || response.data.success) {
        dispatch(resetCartLocal());
        return response.data.data;
      }
      return rejectWithValue('Failed to create order');
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create order';
      return rejectWithValue(msg);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/orders');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all orders');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    allOrders: [],
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
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.adminStatus = 'loading';
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.adminStatus = 'succeeded';
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.adminStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
