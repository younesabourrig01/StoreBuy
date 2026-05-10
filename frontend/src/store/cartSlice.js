import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/apiConfig';
import toast from 'react-hot-toast';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/user/cart');
      return response.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ product, quantity = 1 }, { rejectWithValue }) => {
    try {
      const productId = product._id || product.id;
      const response = await api.post('/user/cart', { product_id: productId, quantity });
      
      if (response.data.status === 'success' || response.data.success) {
        toast.success('Added to cart!');
        return { ...response.data.data, product }; // Return full item with product info
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to add to cart';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/user/cart/${productId}`, { quantity });
      if (response.data.status === 'success' || response.data.success) {
        return { productId, quantity };
      }
    } catch (error) {
      toast.error('Failed to update quantity');
      return rejectWithValue(error.response?.data?.message || 'Failed to update quantity');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/user/cart/${productId}`);
      if (response.data.status === 'success' || response.data.success) {
        toast.success('Removed from cart');
        return productId;
      }
    } catch (error) {
      toast.error('Failed to remove from cart');
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete('/user/cart');
      if (response.data.status === 'success' || response.data.success) {
        toast.success('Cart cleared');
        return [];
      }
    } catch (error) {
      toast.error('Failed to clear cart');
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    resetCartLocal: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload) {
          const existingItem = state.items.find(item => item.productId === action.payload.productId);
          if (existingItem) {
            existingItem.quantity = action.payload.quantity;
          } else {
            state.items.push(action.payload);
          }
        }
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const item = state.items.find(item => item.productId === action.payload.productId);
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.productId !== action.payload);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { resetCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
