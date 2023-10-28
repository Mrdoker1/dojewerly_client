import React, { useEffect, useState, useMemo } from 'react';
import styles from './Input.module.css';
import icons from '../../assets/icons/icons';

export interface InputProps {
  /** Вызывается при клике на инпут */
  onClick?: () => void;
  /** Вызывается при изменении значения инпута */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Значение инпута */
  value?: string;
  /** Дефолтное значение инпута */
  placeholder?: string;
  /** Заголовок/лейбл инпута */
  label?: string;
  /** Тип инпута (например, text, password, и т. д.) */
  type?: string;
  /** Если `true`, инпут будет недоступен для ввода */
  disabled?: boolean;
  /** Дочерние элементы инпута */
  children?: React.ReactNode;
  /** Есть ли ошибка в инпуте */
  hasError?: boolean;
  /** Поле только для чтения */
  /** На всю ширину */
  fullWidth?: boolean;
  readOnly?: boolean;
  /** Сообщение, которое будет отображаться под инпутом */
  message?: string;
  /** Иконка, отображаемая справа от текста инпута */
  iconRight?: keyof typeof icons;
  /** Иконка, отображаемая слева от текста инпута */
  iconLeft?: keyof typeof icons;
  /** Вызывается при клике на иконку справа */
  iconRightClick?: () => void;
  /** Вызывается при клике на иконку слева */
  iconLeftClick?: () => void;
  /** Вызывается при клике на любую кнопку */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Дополнительные классы стилей */
  className?: string;
  containerStyle?: string;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ onChange, readOnly, value, type, disabled, children, label, placeholder, hasError, message, iconRight, iconRightClick, onKeyDown, iconLeft, iconLeftClick, className, containerStyle, fullWidth = true  }, ref) => {
    const [inputValue, setInputValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);
  
    useEffect(() => {
      setInputValue(value);
    }, [value]);
  
    const handleChange = useMemo(() => (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      if (onChange) {
        onChange(event);
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
      <div className={`${fullWidth ? styles.fullWidth : ''} ${styles.container} ${containerStyle} ${hasError ? styles.error : ''}`}>
        <label>{label}</label>
        <div className={`${className} ${styles.inputStyle} ${disabled ? styles.disabled : ''} ${isFocused ? styles.inputFocus : ''} ${hasError ? styles.inputError : ''}`}>
          {IconLeft && <IconLeft onClick={handleIconLeftClick} className={styles.icon} />}
          {children}
          <input
            ref={ref}
            onChange={handleChange}
            value={inputValue}
            type={type} 
            disabled={disabled}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            readOnly={readOnly}
            onKeyDown={onKeyDown}
          />
          {IconRight && <IconRight onClick={handleIconRightClick} className={styles.icon} />}
        </div>
        <div className={`${styles.message} ${hasError ? styles.errorText : ''}`}>{message}</div>
      </div>
    );
  };
  
  export default React.forwardRef(Input);