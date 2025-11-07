import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import currencyReducer from './slices/currencySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        products: productsReducer,
        orders: ordersReducer,
        currency: currencyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;