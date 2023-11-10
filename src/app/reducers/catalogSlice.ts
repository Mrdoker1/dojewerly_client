import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { customFetch } from '../../service/apiService';
import { Product } from './productsSlice';

export interface CatalogState {
  products?: Product[];
  totalProducts?: number;
  totalPages?: number;
  params: ProductQueryParams;
  status: string;
  error: string | null;
}

export interface ProductQueryParams {
  [key: string]: string | number | undefined;
  sort?: string;
  order?: string;
  q?: string;
  page?: number;
  limit?: number;
  material?: string;
  gender?: string;
  availability?: string;
  stock?: number;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const initialState: CatalogState = {
  products: [] as Product[],
  totalProducts: 0,
  totalPages: 0,
  status: 'idle',
  error: null as string | null,
  params: {
    sort: undefined,
    order: undefined,
    q: undefined,
    page: 1,
    limit: 6,
    material: undefined,
    gender: undefined,
    type: undefined,
    availability: undefined,
    stock: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  }
};

export const getAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (queryParams: ProductQueryParams, thunkAPI) => {
    console.log("Query parameters:", queryParams);
    try {
      // Деструктуризация параметров запроса
      const { sort, order, q, page, limit, material, gender, availability, stock, type, minPrice, maxPrice } = queryParams;

      // Формирование строки запроса с использованием деструктуризации и шаблонных строк
      const queryString = Object.entries({ sort, order, q, page, limit, material, gender, availability, stock, type, minPrice, maxPrice })
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

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    // Установить значение фильтра
    setFilter: (state, action: PayloadAction<{ name: keyof ProductQueryParams, value: ProductQueryParams[keyof ProductQueryParams] }>) => {
      const { name, value } = action.payload;
      console.log("setFilter called:", action.payload);
      console.log("Setting filter in Redux:", name, value);
      state.params[name] = value;
    },
    setTotalProducts: (state, action: PayloadAction<number>) => {
      state.totalProducts = action.payload;
      state.totalPages = Math.ceil(state.totalProducts / (state.params.limit || 1));
    },
    // Сбросить все фильтры
    resetFilters: (state) => {
      return initialState;
    },
    // Установить все фильтры
    setAllFilters: (state, action: PayloadAction<ProductQueryParams>) => {
      state.params = { ...state.params, ...action.payload };
    },
    updateFromURL: (state, action: PayloadAction<string>) => {
      const search = action.payload;
      const searchParams = new URLSearchParams(search);
      console.log("Updating from URL:", search);

      searchParams.forEach((value, key) => {
        console.log("Processing key:", key, "with value:", value);
        if (key in initialState) {
            const targetKey = key as keyof CatalogState;
            if (typeof initialState[targetKey] === 'number') {
                state.params[targetKey] = parseInt(value, 10);
            } else {
                state.params[targetKey] = value;
            }
        }
    });
    
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.products = [];
        state.status = 'loading';
      })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch products';
      })
  },
});

export const { setFilter, resetFilters, setAllFilters, updateFromURL, setTotalProducts } = catalogSlice.actions;
export default catalogSlice.reducer;

