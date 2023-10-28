import { createSlice } from '@reduxjs/toolkit';

export interface MenuState {
  isBurgerOpen: boolean;
}

const initialState: MenuState = {
  isBurgerOpen: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openBurgerMenu: (state) => {
      state.isBurgerOpen = true;
    },
    closeBurgerMenu: (state) => {
      state.isBurgerOpen = false;
    },
    toggleBurgerMenu: (state) => {
      state.isBurgerOpen = !state.isBurgerOpen;
    }
  },
});

export const { openBurgerMenu, closeBurgerMenu, toggleBurgerMenu } = menuSlice.actions;
export default menuSlice.reducer;