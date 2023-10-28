import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CatalogState extends ProductQueryParams {
  totalProducts?: number;
  totalPages?: number
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
  totalProducts: 0,
  totalPages: 0,
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
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    // Установить значение фильтра
    setFilter: (state, action: PayloadAction<{ name: keyof ProductQueryParams, value: ProductQueryParams[keyof ProductQueryParams] }>) => {
      const { name, value } = action.payload;
      console.log("setFilter called:", action.payload);
      console.log("Setting filter in Redux:", name, value);
      state[name] = value;
    },
    setTotalProducts: (state, action: PayloadAction<number>) => {
      state.totalProducts = action.payload;
      state.totalPages = Math.ceil(state.totalProducts / (state.limit || 1));
    },
    // Сбросить все фильтры
    resetFilters: (state) => {
      return initialState;
    },
    // Установить все фильтры
    setAllFilters: (state, action: PayloadAction<CatalogState>) => {
      console.log("Setting all filters in reducer:", action.payload);
      return { ...state, ...action.payload };
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
                state[targetKey] = parseInt(value, 10);
            } else {
                state[targetKey] = value;
            }
        }
    });
    
  }
  }
});

export const { setFilter, resetFilters, setAllFilters, updateFromURL, setTotalProducts } = catalogSlice.actions;
export default catalogSlice.reducer;

