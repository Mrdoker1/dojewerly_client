import PasswordInput from './PasswordInput';

export default {
  component: PasswordInput,
  argTypes: {
    onChange: { action: 'changed' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    hasError: { control: 'boolean' },
    message: { control: 'text' },
  },
 tags: ['autodocs'], // Добавлено свойство tags для автогенерации документации
};

export const DefaultInput = {
  args: {
    value: 'Input Value',
    label: 'Input Label',
    placeholder: 'Placeholder',
    message: 'Explanation message',
    disabled: false,
    hasError: false,
  },
};