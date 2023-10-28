import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { customFetch } from '../../service/apiService';

const apiUrl = process.env.REACT_APP_API_URL;

// Определяем тип для критериев каталога
export interface CatalogCriteria {
  materials: string[];
  genders: string[];
  availability: string[];
  types: string[];
}

// Async action to get catalog criteria
export const fetchCatalogCriteria = createAsyncThunk(
  'catalogCriteria/fetch',
  async (_, thunkAPI) => {
    const response = await customFetch(`/catalog-criteria`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch catalog criteria');
    }

    return await response.json();
  }
);

// Async action to update catalog criteria
export const updateCatalogCriteria = createAsyncThunk(
  'catalogCriteria/update',
  async (criteria: CatalogCriteria, thunkAPI) => {
    const response = await customFetch(`/catalog-criteria`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(criteria)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update catalog criteria');
    }

    return await response.json();
  }
);

// Create the slice
export const catalogCriteriaSlice = createSlice({
  name: 'catalogCriteria',
  initialState: {
    criteria: null as CatalogCriteria | null,
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogCriteria.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCatalogCriteria.fulfilled, (state, action: PayloadAction<CatalogCriteria>) => {
        state.status = 'succeeded';
        state.criteria = action.payload;
      })
      .addCase(fetchCatalogCriteria.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateCatalogCriteria.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCatalogCriteria.fulfilled, (state, action: PayloadAction<CatalogCriteria>) => {
        state.status = 'succeeded';
        state.criteria = action.payload;
      })
      .addCase(updateCatalogCriteria.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default catalogCriteriaSlice.reducer;