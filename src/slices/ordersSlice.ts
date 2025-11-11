import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCustomerOrders } from '../services/shopifyService';

interface OrderItem {
    title: string;
    quantity: number;
    price: number;
    image?: string;
}

interface Order {
    id: string;
    orderNumber: number;
    date: string;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    currencyCode: string;
    status: string;
    items: OrderItem[];
}

interface OrdersState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    orders: [],
    loading: false,
    error: null,
};

export const fetchCustomerOrders = createAsyncThunk(
    'orders/fetchCustomerOrders',
    async (customerAccessToken: string, { rejectWithValue }) => {
        try {
            const orders = await getCustomerOrders(customerAccessToken);
            return orders;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.orders = [];
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomerOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchCustomerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearOrders, clearError } = ordersSlice.actions;
export default ordersSlice.reducer;