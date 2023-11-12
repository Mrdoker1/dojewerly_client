// searchSlice.ts или аналогичный файл
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from './productsSlice';
import { customFetch } from '../../service/apiService';

export const fetchSearchedProducts = createAsyncThunk(
  'search/fetchProducts',
  async (searchQuery: string, thunkAPI) => {
    try {
      const queryString = `q=${searchQuery}`;  // Формирование строки запроса только с параметром поиска

      const response = await customFetch(`/products?${queryString}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Не удалось загрузить продукты');
      }

      return await response.json(); // Предполагая, что ответ содержит массив продуктов
    } catch (error) {
      throw new Error('Не удалось загрузить продукты');
    }
  }
);

export const fetchSearchedProductsCount = createAsyncThunk(
  'search/fetchTotalCount',
  async (searchQuery: string, thunkAPI) => {
    try {
      const queryString = `q=${searchQuery}`;  // Формирование строки запроса только с параметром поиска

      const response = await customFetch(`/products/total?${queryString}`);
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Не удалось загрузить общее количество продуктов');
      }
      return await response.json(); // Предполагая, что ответ возвращает общее количество
    } catch (error) {
      throw new Error('Не удалось загрузить общее количество продуктов');
    }
  }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
      products: [] as Product[],
      total: 0,
      status: 'idle',
      error: null as string | null,
      searchQuery: '', // состояние для отслеживания запроса поиска
      isSearchOpen: false, // состояние для отслеживания, открыт ли поиск
    },
    reducers: {
        // другие редюсеры...
        setSearchOpen(state, action) {
          console.log('Setting search open with:', action.payload);
          state.isSearchOpen = action.payload; // payload должен быть булевым значением true/false
        },
        setSearchQuery(state, action) {
          state.searchQuery = action.payload; // payload должен быть строкой
        },
        clearSearch(state) {
          // Этот редюсер может быть использован для сброса состояния поиска
          state.searchQuery = '';
          state.products = [];
          state.total = 0;
          // также можно сбросить другие связанные состояния, если это необходимо
        },
        resetSearch(state) {
          // Этот редюсер может быть использован для сброса состояния поиска
          state.isSearchOpen = false;
          state.searchQuery = '';
          state.products = [];
          state.total = 0;
          // также можно сбросить другие связанные состояния, если это необходимо
        },
        // ... другие редюсеры ...
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSearchedProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchSearchedProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload; // или другой обработчик, если вам нужно обновить состояние иначе
        })
        .addCase(fetchSearchedProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Ошибка при загрузке продуктов';
        })
        .addCase(fetchSearchedProductsCount.fulfilled, (state, action) => {
            state.total = action.payload; // или другой обработчик, если вам нужно обновить состояние иначе
        })
        // ... другие обработчики асинхронных действий ...
  },
});

export const { setSearchOpen, setSearchQuery, resetSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
