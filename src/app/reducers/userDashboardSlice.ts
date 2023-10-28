import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserDashboardState {
  selectedProductId: string | null;
  selectedCollectionId: string | null;
  imagesOrder: string[]; // Состояние для хранения порядка изображений
  radioValue: string;
}

const initialState: UserDashboardState = {
  selectedCollectionId: null,
  selectedProductId: null,
  imagesOrder: [],
  radioValue: 'all',
};

const userDashboardSlice = createSlice({
  name: 'userDashboard',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<string>) => {
      state.selectedProductId = action.payload;
      state.imagesOrder = []; // сброс порядка изображений
    },
    deselectProduct: (state) => {
      state.selectedProductId = null;
      state.imagesOrder = [];
    },
    selectCollection: (state, action: PayloadAction<string>) => {
      state.selectedCollectionId = action.payload;
    },
    deselectCollection: (state) => {
      state.selectedCollectionId = null;
    },
    setImagesOrder: (state, action: PayloadAction<string[]>) => {
      state.imagesOrder = action.payload;
    },
    deleteImageFromOrder: (state, action: PayloadAction<string>) => {
      state.imagesOrder = state.imagesOrder.filter(url => url !== action.payload);
    },
    setRadioValue: (state, action: PayloadAction<string>) => {
      state.radioValue = action.payload;
    },
  },
});

export const { selectProduct, deselectProduct, selectCollection, deselectCollection, setImagesOrder, deleteImageFromOrder, setRadioValue } = userDashboardSlice.actions;

export default userDashboardSlice.reducer;