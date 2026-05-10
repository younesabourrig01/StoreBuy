import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/apiConfig';
import toast from 'react-hot-toast';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/user/favorite');
      return response.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch favorites');
    }
  }
);

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async (product, { rejectWithValue }) => {
    try {
      const productId = product._id || product.id;
      if (!productId) throw new Error('Product ID is missing');

      console.log('Adding to favorite:', productId);
      const response = await api.post('/user/favorite', { product_id: productId });
      
      if (response.data.status === 'success' || response.data.success) {
        toast.success('Added to favorites!');
        return product;
      }
      return rejectWithValue('Failed to add to favorites');
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Failed to add favorite';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async (productId, { rejectWithValue }) => {
    try {
      if (!productId) throw new Error('Product ID is missing');
      
      console.log('Removing from favorite:', productId);
      const response = await api.delete(`/user/favorite/${productId}`);
      
      if (response.data.status === 'success' || response.data.success) {
        toast.success('Removed from favorites');
        return productId;
      }
      return rejectWithValue('Failed to remove favorite');
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Failed to remove favorite';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload);
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter(item => (item._id || item.id) !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;
