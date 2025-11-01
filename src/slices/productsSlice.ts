import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCityCollections, getAllExcursions, getCollectionsWithProducts, getExcursionById } from '../services/shopifyService';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice: number | null;
    images: string[];
    location: string;
    duration: string;
    rating: number;
    reviewsCount: number;
    groupSize: string;
}

interface Variant {
    id: string;
    title: string;
    price: number;
    available: boolean;
}

interface ProductDetail extends Product {
    descriptionHtml: string;
    variants: Variant[];
    highlights: string[];
    whatsIncluded: string[];
}

interface Collection {
    id: string;
    title: string;
    description: string;
    image: string;
    handle: string;
    bannerImages?: string[];
    bannerMediaIds?: string[];
}

interface CollectionWithProducts extends Collection {
    products: Array<{
        id: string;
        title: string;
        image: string;
        location: string;
        images?: {
            edges: Array<{
                node: {
                    url: string;
                    altText: string | null;
                }
            }>
        };
    }>;
}

interface ProductsState {
    products: Product[];
    selectedProduct: ProductDetail | null;
    collections: Collection[];
    collectionsWithProducts: CollectionWithProducts[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    selectedProduct: null,
    collections: [],
    collectionsWithProducts: [],
    loading: false,
    error: null,
};

export const fetchAllExcursions = createAsyncThunk(
    'products/fetchAllExcursions',
    async (_, { rejectWithValue }) => {
        try {
            const excursions = await getAllExcursions();
            return excursions;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const fetchExcursionById = createAsyncThunk(
    'products/fetchExcursionById',
    async (productId: string, { rejectWithValue }) => {
        try {
            const product = await getExcursionById(productId);
            return product;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const fetchAllCollections = createAsyncThunk(
    'products/fetchAllCollections',
    async (_, { rejectWithValue }) => {
        try {
            const collections = await getAllCityCollections();
            return collections;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const fetchCollectionsWithProducts = createAsyncThunk(
    'products/fetchCollectionsWithProducts',
    async (_, { rejectWithValue }) => {
        try {
            const collections = await getCollectionsWithProducts();
            return collections;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all excursions
        builder
            .addCase(fetchAllExcursions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllExcursions.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllExcursions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch single excursion
        builder
            .addCase(fetchExcursionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExcursionById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchExcursionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch all collections
        builder
            .addCase(fetchAllCollections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCollections.fulfilled, (state, action) => {
                state.loading = false;
                state.collections = action.payload;
            })
            .addCase(fetchAllCollections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch collections with products
        builder
            .addCase(fetchCollectionsWithProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCollectionsWithProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.collectionsWithProducts = action.payload;
            })
            .addCase(fetchCollectionsWithProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSelectedProduct, clearError } = productsSlice.actions;
export default productsSlice.reducer;