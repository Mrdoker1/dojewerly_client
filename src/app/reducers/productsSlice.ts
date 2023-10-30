import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductQueryParams } from './catalogSlice';
import { customFetch } from '../../service/apiService';

export type ProductUpdatableProperties = 'name' | 'price' | 'stock' | 'props' | 'imageURLs' | 'localization' | ProductPropsUpdatableProperties;

export type ProductPropsUpdatableProperties = 'id' | 'info' | 'description' | 'availability' | 'material' | 'gender' | 'type';

export interface UpdateProductPropertyPayload {
  productId: string;
  property: ProductUpdatableProperties;
  value: any; // или уточнить тип здесь, если он известен
}

export interface LocalizedProductProps {
  name?: string;
  price?: number;
  info?: string;
  stock?: number;
  description?: string;
}

interface PartialUpdatePayload {
  id: string;
  updates: Product;
}

export interface NewProduct {
  name: string;
  price: number;
  stock: number;
  props: {
    id: number;
    info: string;
    description: string;
    availability: string;
    material: string;
    gender: string;
    type: string;
  };
  imageURLs: string[];
  localization: { [key: string]: Partial<LocalizedProductProps> };
}

// Define the Product type
export interface Product extends NewProduct {
  _id: string;
}

// Async action to create a new product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData: NewProduct, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to create product');
    }

    const data = await response.json();
    return data;
  }
);

// Async action to update a product
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, productData }: { id: string; productData: Product; }, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update product');
    }

    return { id, productData };
  }
);

// Async action to delete a product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string, thunkAPI) => {
    const token = localStorage.getItem('token'); // Получение токена

    if (!token) {
      throw new Error('No session'); // Проверка наличия токена
    }

    const response = await customFetch(`/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}` // Добавление заголовка авторизации
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete product');
    }

    return id; // Return the deleted product's ID
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId: string, thunkAPI) => {
    const response = await customFetch(`/products/${productId}`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch product');
    }
    return await response.json();
  }
);

export const fetchTotalProductsCount = createAsyncThunk(
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

export const fetchAllProducts = createAsyncThunk(
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

// Async action to add an image to a product
export const addImagesToProduct = createAsyncThunk(
  'products/addImages',
  async ({ id, images }: { id: string; images: FileList; }, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    const response = await customFetch(`/products/${id}/images`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to add images');
    }

    const updatedProduct = await response.json();
    return { id, updatedProduct };
  }
);

// Async action to remove an image from a product
export const deleteProductImage = createAsyncThunk(
  'products/removeImage',
  async ({ id, imageUrl }: { id: string; imageUrl: string; }, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/products/${id}/images`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ imageUrl })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to remove image');
    }

    return { id, imageUrl };
  }
);

export const updateImagesOrder = createAsyncThunk(
  'products/updateImagesOrder',
  async ({ id, imagesOrder }: { id: string; imagesOrder: string[]; }, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const response = await customFetch(`/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ imageURLs: imagesOrder })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update images order');
    }

    return { id, imagesOrder };
  }
);

export const partialUpdateProduct = createAsyncThunk<Product, PartialUpdatePayload>(
  'products/partialUpdate',
  async ({ id, updates }, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }
    const response = await customFetch(`/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update product');
    }
    return { id, ...updates };
  }
);

// Then, create the slice
export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [] as Product[],
    totalProducts: 0,
    status: 'idle',
    error: null as string | null
  },
  reducers: {
    updateProductProperty: (state, action: PayloadAction<UpdateProductPropertyPayload>) => {
      const product = state.products.find(p => p._id === action.payload.productId);
      if (product) {
        if (action.payload.property === 'props') {
          product.props = { ...product.props, ...action.payload.value };
        } else {
          (product as any)[action.payload.property] = action.payload.value;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<{ id: string; productData: Product }>) => {
        state.status = 'succeeded';
        const productIndex = state.products.findIndex((prod) => prod._id === action.payload.id);
        if (productIndex > -1) {
          state.products[productIndex] = action.payload.productData;
        }
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to delete product';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.products = state.products.filter((prod) => prod._id !== action.payload);
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      // .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      //   state.status = 'succeeded';
      //   state.products = [...state.products, ...action.payload];
      // })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch products';
      })
      .addCase(addImagesToProduct.fulfilled, (state, action: PayloadAction<{ id: string; updatedProduct: { imageURLs: string[] } }>) => {
        const productIndex = state.products.findIndex((prod) => prod._id === action.payload.id);
        if (productIndex > -1) {
          state.products[productIndex].imageURLs = action.payload.updatedProduct.imageURLs;
        }
      })
      .addCase(deleteProductImage.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to delete product image';
      })
      .addCase(deleteProductImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductImage.fulfilled, (state, action: PayloadAction<{ id: string; imageUrl: string }>) => {
        const productIndex = state.products.findIndex((prod) => prod._id === action.payload.id);
        if (productIndex > -1) {
          state.products[productIndex].imageURLs = state.products[productIndex].imageURLs.filter(
            (url) => url !== action.payload.imageUrl
          );
        }
      })
      .addCase(updateImagesOrder.fulfilled, (state, action: PayloadAction<{ id: string; imagesOrder: string[] }>) => {
        const productIndex = state.products.findIndex((prod) => prod._id === action.payload.id);
        if (productIndex > -1) {
          state.products[productIndex].imageURLs = action.payload.imagesOrder;
        }
      })
      .addCase(partialUpdateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        const productIndex = state.products.findIndex((prod) => prod._id === action.payload._id);
        if (productIndex > -1) {
          state.products[productIndex] = action.payload;
        }
      })
      .addCase(partialUpdateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(partialUpdateProduct.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch partial Update Product';
      })
      .addCase(fetchTotalProductsCount.fulfilled, (state, action: PayloadAction<number>) => {
        state.totalProducts = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        const existingProductIndex = state.products.findIndex(prod => prod._id === action.payload._id);
        if (existingProductIndex >= 0) {
          state.products[existingProductIndex] = action.payload;
        } else {
          state.products.push(action.payload);
        }
      })
  },
});

export default productsSlice.reducer;

export const { updateProductProperty } = productsSlice.actions;