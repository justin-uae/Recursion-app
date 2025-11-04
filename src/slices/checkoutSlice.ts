import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderWithCOD } from '../services/OrderService';

interface OrderLineItem {
    variantId: string;
    quantity: number;
    price: number;
    title: string;
    customAttributes?: Array<{ key: string; value: string }>;
}

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    email: string;
    phone: string;
    totalPrice: number;
    subtotalPrice: number;
    totalTax: number;
    financialStatus: string;
    fulfillmentStatus: string;
    createdAt: string;
    checkoutUrl: string;
    lineItems: Array<{
        title: string;
        quantity: number;
        price: number;
        customAttributes?: Array<{ key: string; value: string }>;
    }>;
}

interface CheckoutState {
    order: Order | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: CheckoutState = {
    order: null,
    loading: false,
    error: null,
    success: false,
};

interface CreateOrderPayload {
    name: string;
    email: string;
    phone: string;
    lineItems: OrderLineItem[];
    note?: string;
    tags?: string[];
}

export const createOrder = createAsyncThunk(
    'checkout/createOrder',
    async (orderData: CreateOrderPayload, { rejectWithValue }) => {
        try {
            const order = await createOrderWithCOD(orderData);
            return order;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        resetCheckout: (state) => {
            state.order = null;
            state.error = null;
            state.success = false;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.success = true;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export const { resetCheckout, clearError } = checkoutSlice.actions;
export default checkoutSlice.reducer;