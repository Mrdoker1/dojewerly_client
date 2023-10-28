import RadioButtonGroup from './RadioButtonGroup';

export default {
  component: RadioButtonGroup,
  argTypes: {
    onChange: { action: 'changed' },
    options: { control: 'object' },
    selectedValue: { control: 'text' },
    orientation: { control: { type: 'radio', options: ['vertical', 'horizontal'] } }  // Добавляем ориентацию
  },
  tags: ['autodocs'],
};

export const DefaultGroup = {
  args: {
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ],
    selectedValue: '',
    orientation: 'vertical'  // Устанавливаем ориентацию по умолчанию
  },
};

export const WithDisabledOption = {
  args: {
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana', disabled: true },
      { label: 'Cherry', value: 'cherry' },
    ],
    selectedValue: '',
    orientation: 'vertical'  // Устанавливаем ориентацию по умолчанию
  },
};

export const HorizontalOrientation = {
  args: {
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ],
    selectedValue: '',
    orientation: 'horizontal'  // Демонстрация горизонтальной ориентации
  },
};