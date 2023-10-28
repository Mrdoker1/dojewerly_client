import Tab from './Tab';

export default {
  component: Tab,
  argTypes: {
    onClick: { action: 'clicked' },
    active: { control: 'boolean' },
    title: { control: 'text' },
  },
  tags: ['autodocs'],
};

export const DefaultTab = {
  args: {
    title: 'Default Tab',
    active: false,
  },
};

export const ActiveTab = {
  args: {
    title: 'Active Tab',
    active: true,
  },
};