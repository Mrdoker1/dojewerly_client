import NotificationMessage from '../NotificationMessage/NotificationMessage';
import icons from '../../../assets/icons/icons';

export default {
  component: NotificationMessage,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['error', 'sucess'],
      },
    },
    message: { control: 'text' },
    iconRight: {
      control: {
        type: 'select',
        options: Object.keys(icons),
      },
    },
    timeout: { control: 'number' },
    iconRightClick: { action: 'Icon clicked' },
    visible: { control: 'boolean' }
  },
  tags: ['autodocs'], // Добавлено свойство tags для автогенерации документации
};

export const DefaultErrorMessage = {
  args: {
    message: 'Error message',
    type: 'error',
    iconRight: 'close',
    timeout: 0,
    visible: true,
  },
};

export const DefaultSucessMessage = {
  args: {
    message: 'Sucess message',
    type: 'success',
    iconRight: 'close',
    timeout: 0,
    visible: true,
  },
};