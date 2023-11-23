import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalType = 'signup' | 'signin' | 'dox' | 'expiredSession';

export interface ModalState {
  type: ModalType | null;
  content: React.ReactNode | null;
  onClose: (() => void) | undefined;
}

const initialState: ModalState = {
  type: null,
  content: null,
  onClose: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: ModalType, content: React.ReactNode, onClose?: () => void }>) => {
      state.type = action.payload.type;
      state.content = action.payload.content;
      state.onClose = action.payload.onClose;
    },
    closeModal: (state) => {
      state.type = null;
      state.content = null;
      state.onClose = undefined;
    }
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
