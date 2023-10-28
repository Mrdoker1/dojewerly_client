import TopMessage from './TopMessage';
import icons from '../../../assets/icons/icons'; // Путь может отличаться

export default {
  component: TopMessage,
  argTypes: {
    message: { control: 'text' },
    iconRight: {
      control: {
        type: 'select',
        options: Object.keys(icons),
      },
    },
    visible: { control: 'boolean' },
  },
};

export const DefaultTopMessage = {
  args: {
    message: 'This is a top message',
    iconRight: 'yourDefaultIconName', // Укажите имя иконки по умолчанию, если есть
    visible: true,
  },
};