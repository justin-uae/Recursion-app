import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customerLogin, customerRegister } from '../services/shopifyService';

interface User {
    email: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

// Async thunks
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await customerLogin(email, password);
            return {
                accessToken: response.accessToken,
                user: { email },
            };
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (
        {
            email,
            password,
            firstName,
            lastName,
        }: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
        },
        { rejectWithValue }
    ) => {
        try {
            await customerRegister(email, password, firstName, lastName);
            // Auto-login after registration
            const loginResponse = await customerLogin(email, password);
            return {
                accessToken: loginResponse.accessToken,
                user: { email },
            };
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const initializeAuth = createAsyncThunk(
    'auth/initializeAuth',
    async (_, { rejectWithValue }) => {
        try {
            const storedToken = localStorage.getItem('customerAccessToken');
            const storedUser = localStorage.getItem('customerData');

            if (storedToken && storedUser) {
                return {
                    accessToken: storedToken,
                    user: JSON.parse(storedUser),
                };
            }
            return null;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('customerAccessToken');
            localStorage.removeItem('customerData');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                localStorage.setItem('customerAccessToken', action.payload.accessToken);
                localStorage.setItem('customerData', JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            });

        // Register
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                localStorage.setItem('customerAccessToken', action.payload.accessToken);
                localStorage.setItem('customerData', JSON.stringify(action.payload.user));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            });

        // Initialize Auth
        builder
            .addCase(initializeAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.accessToken = action.payload.accessToken;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                }
            })
            .addCase(initializeAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;