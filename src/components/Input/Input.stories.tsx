import icons from '../../assets/icons/icons';
import Input from './Input';

export default {
  component: Input,
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

export const DefaultInput = {
  args: {
    value: 'Input Value',
    label: 'Input Label',
    placeholder: 'Placeholder',
    message: 'Explanation message',
    type: 'text',
    disabled: false,
    hasError: false,
  },
};