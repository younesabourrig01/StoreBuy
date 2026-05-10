import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import favoriteReducer from './favoritesSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice';
import notificationReducer from './notificationSlice';
import authReducer from './authSlice';


export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
    user: userReducer,
    orders: orderReducer,
    notifications: notificationReducer,
    auth: authReducer,

  },
});
