import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import { getProducts } from '~/api'
import { DEFAULT_ITEMS_PER_HOME_PAGE, DEFAULT_PAGE } from '~/utils/constants'

const initialState = {
    products: [],
    page: DEFAULT_PAGE,
    totalPages: 1,
    isLoading: false,
    error: null,
    isLoadingMore: false
}

export const fetchInitialProductsAPI = createAsyncThunk(
    'products/fetchInitialProducts',
    async () => {
        const response = await getProducts(DEFAULT_PAGE, DEFAULT_ITEMS_PER_HOME_PAGE)
        return response
    }
)

export const fetchMoreProductsAPI = createAsyncThunk(
    'products/fetchMoreProducts',
    async (nextPage) => {
        const response = await getProducts(nextPage, DEFAULT_ITEMS_PER_HOME_PAGE)
        return response
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductsToInitialState: (state) => {
            state.products = state.products.slice(0, DEFAULT_ITEMS_PER_HOME_PAGE)
            state.page = DEFAULT_PAGE
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialProductsAPI.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchInitialProductsAPI.fulfilled, (state, action) => {
                state.isLoading = false
                const payload = action.payload || { products: [], totalPages: 1 }
                state.products = payload.products || []
                state.totalPages = payload.totalPages || 1
                state.page = DEFAULT_PAGE
            })
            .addCase(fetchInitialProductsAPI.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error?.message || 'Failed to fetch initial products'
            })

        builder
            .addCase(fetchMoreProductsAPI.pending, (state) => {
                state.isLoadingMore = true
                state.error = null
            })
            .addCase(fetchMoreProductsAPI.fulfilled, (state, action) => {
                state.isLoadingMore = false
                const payload = action.payload || { products: [], totalPages: 1 }
                state.products = [...state.products, ...(payload.products || [])]
                state.totalPages = payload.totalPages || 1
                state.page += 1
            })
            .addCase(fetchMoreProductsAPI.rejected, (state, action) => {
                state.isLoadingMore = false
                state.error = action.error?.message || 'Failed to load more products'
            })
    }
})

export const selectPageInfo = createSelector(
    (state) => state.products,
    ({ page, totalPages, isLoading, isLoadingMore }) => ({
        page,
        totalPages,
        isLoading,
        isLoadingMore
    })
)

export const selectProducts = (state) => state.products.products

export const { setProductsToInitialState } = productSlice.actions

export const productReducer = productSlice.reducer
