import { AppDispatch } from '../../app/store';
import { addNotification } from '../../app/reducers/notificationSlice';

export const sendNotification = (dispatch: AppDispatch, type: 'success' | 'error', message: string) => {
  dispatch(addNotification({
    id: Date.now(),
    type,
    message,
    iconRight: 'close',
    timeout: 3000,
  }));
};
