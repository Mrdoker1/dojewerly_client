import { AppDispatch } from '../../app/store';
import { addNotification } from '../../app/reducers/notificationSlice';
import { MessageType } from '../Messages/messageTypes';

export const sendNotification = (dispatch: AppDispatch, type: MessageType, message: string) => {
  dispatch(addNotification({
    id: Date.now(),
    type,
    message,
    iconRight: 'close',
    timeout: 3000,
  }));
};
