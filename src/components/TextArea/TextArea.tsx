import React, { useEffect, useState, useMemo } from 'react';
import styles from './TextArea.module.css';
import icons from '../../assets/icons/icons';
import { InputProps } from '../../components/Input/Input'

// Используем те же пропсы, что и для Input
export interface TextAreaProps extends InputProps {}

const TextArea: React.FC<TextAreaProps> = ({ onChange, value, disabled, children, label, placeholder, hasError, message, iconRight, iconRightClick, iconLeft, iconLeftClick  }) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = useMemo(() => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event as any); // Кастинг к типу React.ChangeEvent<HTMLInputElement>, если ваш обработчик ожидает это
    }
  }, [onChange]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleIconRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (iconRightClick) {
      iconRightClick();
    }
  };

  const handleIconLeftClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (iconLeftClick) {
      iconLeftClick();
    }
  };

  const IconRight = iconRight ? icons[iconRight] : null;
  const IconLeft = iconLeft ? icons[iconLeft] : null;

  return (
    <div className={`${styles.container} ${hasError ? styles.error : ''}`}>
      <label>{label}</label>
      <div className={`${styles.inputStyle} ${isFocused ? styles.inputFocus : ''} ${hasError ? styles.inputError : ''}`}>
        {IconLeft && <IconLeft onClick={handleIconLeftClick} className={styles.icon} />}
        <div className={styles.children}>{children}</div>
        <textarea
          onChange={handleChange}
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
        </textarea>
        {IconRight && <IconRight onClick={handleIconRightClick} className={styles.icon} />}
      </div>
      <div className={`${styles.message} ${hasError ? styles.errorText : ''}`}>{message}</div>
    </div>
  );
};

export default TextArea;