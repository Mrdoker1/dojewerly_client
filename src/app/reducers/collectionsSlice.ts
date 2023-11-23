import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { customFetch } from '../../service/apiService';

const apiUrl = process.env.REACT_APP_API_URL;

export interface LocalizedCollectionProps {
  name?: string;
  description?: string;
}

export interface Collection {
  _id?: string;
  name: string;
  description: string;
  productIds: string[];
  localization: { [key: string]: LocalizedCollectionProps };
}

export type CollectionUpdatableProperties = 'name' | 'description' | 'productIds' | 'localization';

export interface UpdateCollectionPropertyPayload {
  collectionId: string;
  property: CollectionUpdatableProperties;
  value: any; // или уточнить тип здесь, если он известен
}

// Async action to get all collections
export const fetchAllCollections = createAsyncThunk(
  'collections/fetchAll',
  async (_, thunkAPI) => {
    const response = await customFetch(`/collections`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch collections');
    }

    return await response.json();
  }
);

// Async action to create a new collection
export const createCollection = createAsyncThunk(
  'collections/create',
  async (collectionData: Collection, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(collectionData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to create collection');
    }

    const data = await response.json();
    return data;
  }
);

// Async action to get a collection by id
export const fetchCollectionById = createAsyncThunk(
  'collections/fetchById',
  async (id: string, thunkAPI) => {
    const response = await customFetch(`/collections/${id}`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch collection');
    }

    return await response.json();
  }
);

// Async action to update a collection by id
export const updateCollectionById = createAsyncThunk(
  'collections/update',
  async ({ id, collectionData }: { id: string; collectionData: Collection; }, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/collections/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(collectionData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update collection');
    }

    return { id, collectionData };
  }
);

// Async action to delete a collection by id
export const deleteCollection = createAsyncThunk(
  'collections/delete',
  async (id: string, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/collections/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete collection');
    }

    return id;
  }
);

// Async action to add a product to a collection
export const addProductToCollection = createAsyncThunk(
  'collections/addProduct',
  async ({ collectionId, productId }: { collectionId: string; productId: string }, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/collections/${collectionId}/products/${productId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to add product to collection');
    }

    return { collectionId, productId };
  }
);

// Async action to remove a product from a collection
export const removeProductFromCollection = createAsyncThunk(
  'collections/removeProduct',
  async ({ collectionId, productId }: { collectionId: string; productId: string }, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/collections/${collectionId}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to remove product from collection');
    }

    return { collectionId, productId };
  }
);

// Create the slice
export const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    collections: [] as Collection[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {
    updateCollectionProperty: (state, action: PayloadAction<UpdateCollectionPropertyPayload>) => {
      const collection = state.collections.find(c => c._id === action.payload.collectionId);
      if (collection) {
        (collection as any)[action.payload.property] = action.payload.value;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCollections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCollections.fulfilled, (state, action: PayloadAction<Collection[]>) => {
        state.status = 'succeeded';
        state.collections = action.payload;
      })
      .addCase(fetchAllCollections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCollection.fulfilled, (state, action: PayloadAction<Collection>) => {
        state.status = 'succeeded';
        state.collections.push(action.payload);
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchCollectionById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCollectionById.fulfilled, (state, action: PayloadAction<Collection>) => {
        state.status = 'succeeded';
        const collectionIndex = state.collections.findIndex((coll) => coll._id === action.payload._id);
        if (collectionIndex > -1) {
          state.collections[collectionIndex] = action.payload;
        } else {
          state.collections.push(action.payload);
        }
      })
      .addCase(fetchCollectionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateCollectionById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCollectionById.fulfilled, (state, action: PayloadAction<{ id: string; collectionData: Collection }>) => {
        state.status = 'succeeded';
        const collectionIndex = state.collections.findIndex((coll) => coll._id === action.payload.id);
        if (collectionIndex > -1) {
          state.collections[collectionIndex] = action.payload.collectionData;
        }
      })
      .addCase(updateCollectionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(deleteCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCollection.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.collections = state.collections.filter((coll) => coll._id !== action.payload);
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addProductToCollection.fulfilled, (state, action: PayloadAction<{ collectionId: string; productId: string }>) => {
        const { collectionId, productId } = action.payload;
        const collectionIndex = state.collections.findIndex((coll) => coll._id === collectionId);

        if (collectionIndex > -1) {
          state.collections[collectionIndex].productIds.push(productId);
        }
      })
      .addCase(removeProductFromCollection.fulfilled, (state, action: PayloadAction<{ collectionId: string; productId: string }>) => {
        const { collectionId, productId } = action.payload;
        const collectionIndex = state.collections.findIndex((coll) => coll._id === collectionId);

        if (collectionIndex > -1) {
          state.collections[collectionIndex].productIds = state.collections[collectionIndex].productIds.filter((id) => id !== productId);
        }
      });
  },
});

export default collectionsSlice.reducer;

export const { updateCollectionProperty } = collectionsSlice.actions;