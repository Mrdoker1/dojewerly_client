import React, { useState } from 'react';
import styles from './RadioButtonGroup.module.css';
import RadioButton from './RadioButton/RadioButton';

export interface RadioButtonGroupProps {
  options: { label: string; value: string; disabled?: boolean }[];
  onChange?: (selectedValue: string) => void;
  selectedValue?: string;
  orientation?: 'vertical' | 'horizontal';  // Добавляем ориентацию как опциональный проп
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, onChange, selectedValue, orientation = 'vertical' }) => {
  const [selected, setSelected] = useState(selectedValue || '');

  const handleRadioButtonChange = (isChecked: boolean, value: string) => {
    if (isChecked) {
      setSelected(value);
      if (onChange) {
        onChange(value);
      }
    }
  };

  return (
    <div className={`${styles.radioButtonGroupContainer} ${orientation === 'horizontal' ? styles.horizontal : ''}`}>
      {options.map((option, index) => (
        <RadioButton
          key={index}
          label={option.label}
          checked={selected === option.value}
          disabled={option.disabled}
          onChange={(isChecked) => handleRadioButtonChange(isChecked, option.value)}
        />
      ))}
    </div>
  );
};

export default RadioButtonGroup;