import Checkbox from './Checkbox';

export default {
  component: Checkbox,
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
    label: 'Explanation Checkbox Text',
    checked: false,
    disabled: false,
  },
};