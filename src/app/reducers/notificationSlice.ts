import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import icons from '../../assets/icons/icons';
import { MessageType } from '../../components/Messages/messageTypes';

export interface Notification {
  id: number;
  type: MessageType;
  message: string;
  iconRight?: keyof typeof icons; // Добавим иконку справа
  iconLeft?: keyof typeof icons; // Добавим иконку справа
  timeout?: number; // Добавим таймаут
}

export interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;