import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { customFetch } from '../../service/apiService';

// Определяем типы для локализованных данных
interface LocalizedData {
  [languageCode: string]: {
    text: string;
    subject: string;
  };
}

interface BaseEmailData {
  subject: string;
  text: string;
  localization: LocalizedData;
}

interface ProductEmailData extends BaseEmailData {
  productIds: string[];
}

interface CollectionEmailData extends BaseEmailData {
  collectionIds: string[];
}

type EmailData = ProductEmailData | CollectionEmailData;


// Async action to send email with product info
export const sendEmailWithProductInfo = createAsyncThunk(
    'email/sendProductInfo',
    async (emailData: EmailData, thunkAPI) => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
  
      const response = await customFetch(`/email/send-product-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(emailData)
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send product info email');
      }
  
      return await response.json();
    }
  );
  
// Async action to send email with collection info
export const sendEmailWithCollectionInfo = createAsyncThunk(
  'email/sendCollectionInfo',
  async (emailData: EmailData, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await customFetch(`/email/send-collection-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to send collection info email');
    }

    return await response.json();
  }
);

// Create the email slice
export const emailSlice = createSlice({
  name: 'email',
  initialState: {
    emailType: 'product' as 'product' | 'collection', // 'product' или 'collection'
    subject: '',
    text: '',
    productIds: [] as string[],
    collectionIds: [] as string[],
    localization: {} as LocalizedData,
    status: 'idle',
    error: null as string | null,
  },
  reducers: {
    setEmailType(state, action: PayloadAction<'product' | 'collection'>) {
      state.emailType = action.payload;
    },
    updateSubject(state, action: PayloadAction<string>) {
      state.subject = action.payload;
    },
    updateText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
    updateProductIds(state, action: PayloadAction<string[]>) {
      state.productIds = action.payload;
      // state.collectionIds = []; // Сбросить collectionIds, если обновляем productIds
    },
    updateCollectionIds(state, action: PayloadAction<string[]>) {
      state.collectionIds = action.payload;
      // state.productIds = []; // Сбросить productIds, если обновляем collectionIds
    },
    updateLocalization(state, action: PayloadAction<{ language: string, text?: string, subject?: string }>) {
      const { language, text, subject } = action.payload;
      if (!state.localization[language]) {
        state.localization[language] = { text: '', subject: '' };
      }
      if (text !== undefined) {
        state.localization[language].text = text;
      }
      if (subject !== undefined) {
        state.localization[language].subject = subject;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle sending email with product info
      .addCase(sendEmailWithProductInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendEmailWithProductInfo.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendEmailWithProductInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      // Handle sending email with collection info
      .addCase(sendEmailWithCollectionInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendEmailWithCollectionInfo.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendEmailWithCollectionInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default emailSlice.reducer;
export const { setEmailType, updateSubject, updateText, updateProductIds, updateCollectionIds, updateLocalization } = emailSlice.actions;
