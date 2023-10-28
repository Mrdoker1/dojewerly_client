import icons from '../../assets/icons/icons';
import ContextMenu from './ContextMenu';

export default {
  component: ContextMenu,
  argTypes: {
    onClick: { action: 'clicked' },
    link: { table: { disable: true } },
    iconLeft: { control: 'select', options: [''].concat(Object.keys(icons)) },
    iconRight: { control: 'select', options: [''].concat(Object.keys(icons)) },
  },
  tags: ['autodocs'],
};

export const ContextMenuExample = {
  args: {
    items: [
      {
        label: 'Dashboard',
        link: '/dashboard',
        iconLeft: 'leftIcon',
      },
      {
        label: 'Logout',
        link: '/logout',
        iconRight: 'rightIcon',
      },
    ],
  },
};