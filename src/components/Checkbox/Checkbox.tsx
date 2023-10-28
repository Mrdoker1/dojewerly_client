import React, { useState, useEffect } from 'react';
import styles from './Checkbox.module.css';
import icons from '../../assets/icons/icons';

export interface CheckboxProps {
  /** Вызывается при изменении состояния чекбокса */
  onChange?: (isChecked: boolean) => void;
  /** Текст чекбокса */
  label?: string;
  /** Если `true`, чекбокс будет выбран */
  checked?: boolean;
  /** Если `true`, чекбокс будет отключен */
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, disabled = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);
  
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  const Icon = icons.checkmark;

  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={styles.checkboxInput}
        disabled={disabled}
      />
      <span className={`${styles.checkboxCustom} ${isChecked ? styles.checked : ''}`}>
        {isChecked && <Icon className={styles.icon} />}
      </span>
      <span className={styles.labelText}>{label}</span>
    </label>
  );
};

export default Checkbox;