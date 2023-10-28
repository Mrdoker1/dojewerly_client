import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';
import { customFetch } from '../../service/apiService';

const apiUrl = process.env.REACT_APP_API_URL;

// Async action to get all favorite products
export const fetchAllFavourites = createAsyncThunk(
  'favourites/fetchAll',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/users/me/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch favourites');
    }

    return await response.json();
  }
);

// Async action to get favorite products by user ID
export const fetchUserFavourites = createAsyncThunk(
  'favourites/fetchByUserId',
  async (userId: string, thunkAPI) => {
    const response = await customFetch(`/users/me/favorites/${userId}/favorites`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch favourites by user ID');
    }
    return await response.json();
  }
);

// Async action to add a product to favorites
export const addProductToFavourites = createAsyncThunk(
  'favourites/addProduct',
  async (productId: string, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/users/me/favorites/${productId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to add product to favourites');
    }

    return productId;
  }
);

// Async action to remove a product from favorites
export const removeProductFromFavourites = createAsyncThunk(
  'favourites/removeProduct',
  async (productId: string, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/users/me/favorites/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to remove product from favourites');
    }

    return productId;
  }
);

// Create the slice (initial state and reducers to be added later)
export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favouriteProducts: [] as Product[],  // 2. Заменить favouriteProductIds на favouriteProducts
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching all favourites
      .addCase(fetchAllFavourites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllFavourites.fulfilled, (state, action: PayloadAction<Product[]>) => {  // Обновить тип PayloadAction
        state.status = 'succeeded';
        state.favouriteProducts = action.payload;  // Обновить список продуктов
      })
      .addCase(fetchAllFavourites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      
      // Handle adding a product to favourites
      .addCase(addProductToFavourites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToFavourites.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        // Этот обработчик возможно потребуется обновить, если API возвращает полный объект продукта при добавлении в избранное
        // Если это так, нужно будет добавить продукт в список favouriteProducts
      })
      .addCase(addProductToFavourites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
  
      // Handle removing a product from favourites
      .addCase(removeProductFromFavourites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProductFromFavourites.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.favouriteProducts = state.favouriteProducts.filter(product => product._id !== action.payload);  // Удалить продукт из списка по его _id
      })
      .addCase(removeProductFromFavourites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchUserFavourites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserFavourites.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.favouriteProducts = action.payload; 
      })
      .addCase(fetchUserFavourites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
  },
});

export default favouritesSlice.reducer;