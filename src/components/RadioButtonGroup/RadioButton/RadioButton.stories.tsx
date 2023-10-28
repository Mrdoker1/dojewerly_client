import RadioButton from './RadioButton';

export default {
  component: RadioButton,
  argTypes: {
    onClick: { action: 'clicked' },
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export const PrimaryButton = {
  args: {
    label: 'Explanation Text',
    checked: false,
    disabled: false,
  },
};
