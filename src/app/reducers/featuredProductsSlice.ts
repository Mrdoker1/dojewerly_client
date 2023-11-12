// searchSlice.ts или аналогичный файл
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from './productsSlice';
import { customFetch } from '../../service/apiService';
import { ProductQueryParams } from './catalogSlice';


export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchAll',
  async (queryParams: ProductQueryParams, thunkAPI) => {
    console.log("Query parameters:", queryParams);
    try {
      // Деструктуризация параметров запроса
      const { sort, order, q, page, limit, material, gender, availability, stock, type, minPrice, maxPrice, includeUnavailable } = queryParams;

      // Формирование строки запроса с использованием деструктуризации и шаблонных строк
      const queryString = Object.entries({ sort, order, q, page, limit, material, gender, availability, stock, type, minPrice, maxPrice, includeUnavailable })
        .filter(([, value]) => value !== null && value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      const url = `/products?${queryString}`;
      console.log("Fetching products with URL:", url);
      const response = await customFetch(url);

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

export const fetchFeaturedProductsCount = createAsyncThunk(
  'products/fetchTotalCount',
  async (queryParams: ProductQueryParams, thunkAPI) => {
    try {
      // Создание копии объекта queryParams
      const queryParamsCopy = { ...queryParams };

      // Удаление параметров пагинации из копии
      delete queryParamsCopy.page;
      delete queryParamsCopy.limit;

      const queryString = Object.entries(queryParamsCopy)
        .filter(([, value]) => value !== null && value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      console.log("Total:", queryParamsCopy);
      
      const response = await customFetch(`/products/total?${queryString}`);
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Не удалось загрузить общее количество продуктов');
      }
      return await response.json();
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
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchFeaturedProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload; // или другой обработчик, если вам нужно обновить состояние иначе
        })
        .addCase(fetchFeaturedProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Ошибка при загрузке продуктов';
        })
        .addCase(fetchFeaturedProductsCount.fulfilled, (state, action) => {
            state.total = action.payload; // или другой обработчик, если вам нужно обновить состояние иначе
        })
        // ... другие обработчики асинхронных действий ...
  },
});

export default searchSlice.reducer;
