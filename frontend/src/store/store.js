import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import favoriteReducer from './favoriteSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice';
import notificationReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
    user: userReducer,
    orders: orderReducer,
    notifications: notificationReducer,
  },
});
