import TextArea from './TextArea';
import icons from '../../assets/icons/icons';

export default {
    component: TextArea,
    argTypes: {
      onChange: { action: 'changed' },
      onClick: { action: 'clicked' },
      iconRightClick: { action: 'clicked' },
      iconLeftClick: { action: 'clicked' },
      disabled: { control: 'boolean' },
      value: { control: 'text' },
      placeholder: { control: 'text' },
      label: { control: 'text' },
      type: { control: 'radio', options: ['Text', 'Password'] },
      hasError: { control: 'boolean' },
      message: { control: 'text' },
      iconRight: { control: 'select', options: [''].concat(Object.keys(icons)) },
      iconLeft: { control: 'select', options: [''].concat(Object.keys(icons)) },
    },
   tags: ['autodocs'], // Добавлено свойство tags для автогенерации документации
  };

export const DefaultTextArea = {
  args: {
    value: 'TextArea Value',
    label: 'TextArea Label',
    placeholder: 'Placeholder',
    message: 'Explanation message',
    disabled: false,
    hasError: false,
  },
};