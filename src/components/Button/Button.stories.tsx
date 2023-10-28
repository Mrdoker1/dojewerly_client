import icons from '../../assets/icons/icons';
import Button from './Button';

export default {
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    text: { control: 'text' },
    size: { control: 'radio', options: ['small', 'default', 'large'] },
    type: { control: 'radio', options: ['button', 'submit', 'reset'] },
    customColor: { control: 'color' },
    variant: { control: 'radio', options: ['primary', 'secondary', 'text'] },
    iconLeft: { control: 'select', options: [''].concat(Object.keys(icons)) },
    iconRight: { control: 'select', options: [''].concat(Object.keys(icons)) },
  },
  tags: ['autodocs'],
};

export const PrimaryButton = {
  args: {
    text: 'Primary Button',
    disabled: false,
    fullWidth: false,
    size: 'default',
    type: 'button',
    customColor: '',
    variant: 'primary',
    iconLeft: 'leftIcon',
    iconRight: 'rightIcon',
  },
};

export const SecondaryButton = {
  args: {
    text: 'Secondary Button',
    disabled: false,
    fullWidth: false,
    size: 'default',
    type: 'button',
    customColor: '',
    variant: 'secondary',
    iconLeft: 'leftIcon',
    iconRight: 'rightIcon',
  },
};

export const TextButton = {
  args: {
    text: 'Text Button',
    disabled: false,
    fullWidth: false,
    size: 'default',
    type: 'button',
    variant: 'text',
    iconLeft: 'leftIcon',
    iconRight: 'rightIcon',
  },
};

export const ButtonWithLeftIcon = {
  args: {
    text: 'Button With Left Icon',
    disabled: false,
    fullWidth: false,
    size: 'default',
    type: 'button',
    customColor: '',
    variant: 'primary',
    iconLeft: 'arrowLeft',
  },
};

export const ButtonWithRightIcon = {
  args: {
    text: 'Button With Right Icon',
    disabled: false,
    fullWidth: false,
    size: 'default',
    type: 'button',
    customColor: '',
    variant: 'secondary',
    iconRight: 'arrowRight',
  },
};

export const ButtonWithTwoIcons = {
  args: {
    text: 'Button With Two Icons',
    disabled: false,
    fullWidth: false,
    size: 'default',
    type: 'button',
    customColor: '',
    variant: 'primary',
    iconLeft: 'arrowLeft',
    iconRight: 'arrowRight',
  },
};