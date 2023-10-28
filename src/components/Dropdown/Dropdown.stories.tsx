import React from 'react';
import icons from '../../assets/icons/icons';
import Dropdown, { DropdownOption } from './Dropdown';

export default {
  component: Dropdown,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    onChange: { action: 'changed' },
    label: { control: 'text' },
    hasError: { control: 'boolean' },
    message: { control: 'text' },
    iconRight: { control: 'select', options: [''].concat(Object.keys(icons)) },
  },
  tags: ['autodocs'],
};

const defaultOptions: DropdownOption[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' }
];

export const DefaultDropdown = {
  args: {
    value: 'option1',
    placeholder: 'Select an option...',
    options: defaultOptions,
    label: 'Dropdown Label',
    message: 'Explanation message',
    hasError: false,
  },
};

const CustomLabel = () => <div style={{ color: 'red' }}>Custom Label</div>;

const customOptions: DropdownOption[] = [
  { label: 'Option 1', value: 'option1' },
  { label: <CustomLabel />, value: 'custom' }
];

export const WithCustomLabels = {
  args: {
    value: 'option1',
    placeholder: 'Select an option...',
    options: customOptions,
    label: 'Dropdown with Custom Labels',
    message: 'You can use custom components as labels',
    hasError: false,
  },
};