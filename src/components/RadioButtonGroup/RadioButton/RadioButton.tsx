import React, { useState, useEffect } from 'react';
import styles from './RadioButton.module.css';

export interface RadioButtonProps {
  /** Вызывается при изменении состояния радиокнопки */
  onChange?: (isChecked: boolean) => void;
  /** Текст радиокнопки */
  label?: string;
  /** Если `true`, радиокнопка будет выбрана */
  checked?: boolean;
  /** Если `true`, радиокнопка будет отключена */
  disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, checked = false, disabled = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);
  
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleRadioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className={styles.radioButtonContainer}>
      <input
        type="radio"
        checked={isChecked}
        onChange={handleRadioButtonChange}
        className={styles.radioButtonInput}
        disabled={disabled}
      />
      <span className={`${styles.radioButtonCustom} ${isChecked ? styles.checked : ''}`}></span>
      <span className={styles.labelText}>{label}</span>
    </label>
  );
};

export default RadioButton;