import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock async thunks for future backend integration
export const updateUserInfo = createAsyncThunk(
  'user/updateInfo',
  async (userData) => {
    // const response = await fetch('/api/user/update', { ... });
    // return await response.json();
    return userData; // Simulated success
  }
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (passwords) => {
    // const response = await fetch('/api/user/password', { ... });
    // return await response.json();
    return true; 
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {
      name: 'John Doe',
      email: 'john@example.com',
      phone_number: '0612345678',
      adress: '123 Street Name',
      region: 'Casablanca',
      image: 'https://via.placeholder.com/150',
      role: 'admin'
    },
    isAuthenticated: true, // Mocking logged in state
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    deleteAccount: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.currentUser = { ...state.currentUser, ...action.payload };
      });
  },
});

export const { logout, deleteAccount } = userSlice.actions;
export default userSlice.reducer;
