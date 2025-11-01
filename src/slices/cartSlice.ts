import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { createCart, addToCart as addToCartAPI, } from '../services/shopifyService';

interface CustomAttributes {
    date?: string;
    adults?: string;
    children?: string;
    totalGuests?: string;
}

interface CartItem {
    variantId: string;
    quantity: number;
    title: string;
    price: number;
    image?: string;
    productId: string;
    customAttributes?: CustomAttributes;
}

interface CheckoutData {
    id: string;
    checkoutUrl: string;
    lines: any[];
    totalPrice: number;
}

interface CartState {
    items: CartItem[];
    checkout: CheckoutData | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    checkout: null,
    loading: false,
    error: null,
};

// Load cart from localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return [];
    }
};

const loadCheckoutFromLocalStorage = (): CheckoutData | null => {
    try {
        const savedCheckout = localStorage.getItem('checkout');
        return savedCheckout ? JSON.parse(savedCheckout) : null;
    } catch (error) {
        console.error('Error loading checkout from localStorage:', error);
        return null;
    }
};

// Async thunk for adding to cart
export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (
        { item, currentCheckout }: { item: CartItem; currentCheckout: CheckoutData | null },
        { rejectWithValue }
    ) => {
        try {
            const lineItems = [
                {
                    merchandiseId: item.variantId,
                    quantity: item.quantity,
                    attributes: item.customAttributes
                        ? [
                            { key: 'Date', value: item.customAttributes.date || '' },
                            { key: 'Adults', value: item.customAttributes.adults || '0' },
                            { key: 'Children', value: item.customAttributes.children || '0' },
                            { key: 'Total Guests', value: item.customAttributes.totalGuests || '0' },
                        ]
                        : [],
                },
            ];

            let updatedCheckout;
            if (currentCheckout?.id) {
                try {
                    updatedCheckout = await addToCartAPI(currentCheckout.id, lineItems);
                } catch (error) {
                    // If cart expired, create new one
                    console.log('Cart expired, creating new cart');
                    updatedCheckout = await createCart(lineItems);
                }
            } else {
                updatedCheckout = await createCart(lineItems);
            }

            return {
                item,
                checkout: {
                    id: updatedCheckout.id,
                    checkoutUrl: updatedCheckout.checkoutUrl,
                    lines: updatedCheckout.lines,
                    totalPrice: parseFloat(updatedCheckout.cost.totalAmount.amount),
                },
            };
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        ...initialState,
        items: loadCartFromLocalStorage(),
        checkout: loadCheckoutFromLocalStorage(),
    },
    reducers: {
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.variantId !== action.payload
            );
            localStorage.setItem('cart', JSON.stringify(state.items));

            if (state.items.length === 0) {
                state.checkout = null;
                localStorage.removeItem('checkout');
            }
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ variantId: string; quantity: number }>
        ) => {
            const { variantId, quantity } = action.payload;

            if (quantity <= 0) {
                state.items = state.items.filter((item) => item.variantId !== variantId);
            } else {
                const item = state.items.find((item) => item.variantId === variantId);
                if (item) {
                    item.quantity = quantity;
                }
            }

            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            state.checkout = null;
            localStorage.removeItem('cart');
            localStorage.removeItem('checkout');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                const { item, checkout } = action.payload;

                // Check if item already exists with same date
                const existingItemIndex = state.items.findIndex(
                    (cartItem) =>
                        cartItem.variantId === item.variantId &&
                        cartItem.customAttributes?.date === item.customAttributes?.date
                );

                if (existingItemIndex > -1) {
                    // Update quantity
                    state.items[existingItemIndex].quantity += item.quantity;
                    state.items[existingItemIndex].customAttributes = {
                        ...state.items[existingItemIndex].customAttributes,
                        ...item.customAttributes,
                        totalGuests: (
                            parseInt(state.items[existingItemIndex].customAttributes?.totalGuests || '0') +
                            parseInt(item.customAttributes?.totalGuests || '0')
                        ).toString(),
                    };
                } else {
                    // Add new item
                    state.items.push(item);
                }

                state.checkout = checkout;
                localStorage.setItem('cart', JSON.stringify(state.items));
                localStorage.setItem('checkout', JSON.stringify(checkout));
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { removeFromCart, updateQuantity, clearCart, clearError } =
    cartSlice.actions;

export default cartSlice.reducer;