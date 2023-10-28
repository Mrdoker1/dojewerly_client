import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';
import icons from '../../assets/icons/icons';
import { motion } from 'framer-motion';

export interface DropdownOption {
    label: string | React.ReactNode;  // может быть строкой или React-компонентом
    value: string;
    disabled?: boolean;  // опциональный параметр, если нужно отключить определенную опцию
  }

export interface DropdownProps {
    /** Массив опций для дропдауна */
    options: DropdownOption[];
    /** Вызывается при изменении значения дропдауна */
    onChange?: (value: string) => void;
    /** Значение дропдауна */
    value?: string | number;
    /** Плейсхолдер если нет значения */
    placeholder?: string;
    /** Заголовок/лейбл дропдауна */
    label?: string;
    /** Есть ли ошибка в дропдауне */
    hasError?: boolean;
    /** Сообщение, которое будет отображаться под дропдауном */
    message?: string;
    /** Иконка, отображаемая справа от дропдауна */
    iconRight?: keyof typeof icons;
    /** Если `true`, дропдаун будет недоступен для ввода */
    disabled?: boolean;
    /** Дополнительные классы стилей */
    className?: string;
    /** Дополнительные классы стилей для контейнера опций списка*/
    optionsStyle?:string
    /** Дополнительные классы стилей для опции списка*/
    optionStyle?: string;
    /** На всю ширину */
    fullWidth?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange, label, hasError, message, iconRight, placeholder, value, className, optionsStyle, optionStyle, fullWidth }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const dropdownRef = useRef<HTMLDivElement>(null);  // <-- Уточняем тип здесь

    // Локальные переменные состояния для ошибки и сообщения
    const [internalHasError, setInternalHasError] = useState(false);
    const [internalMessage, setInternalMessage] = useState('');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {  // <-- Уточняем тип здесь
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {  // <-- Приведение типа для event.target
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const IconRight = isOpen ? icons['arrowUp'] : (iconRight ? icons[iconRight] : icons['arrowDown']);

    const handleDropdownChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, selectedOption: string) => {
        setSelectedValue(selectedOption);
        setIsOpen(false);
        if (onChange) {
            onChange(selectedOption);
        }
    };

    useEffect(() => {
        if (value === undefined || value === null || value === '') {
            setInternalHasError(false);
            setInternalMessage('');
        } else {
            const isValidValue = options.some(option => option.value === value);
            if (!isValidValue) {
                setInternalHasError(true);
                setInternalMessage('Received invalid value for dropdown');
            } else {
                setInternalHasError(hasError || false);
                setInternalMessage(message || '');
            }
        }
        setSelectedValue(value);
    }, [value, options, message, hasError]);

    return (
        <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`} ref={dropdownRef}>
          {label && <div className={styles.label}>{label}</div>}
          <div className={`${styles.dropdown} ${className} ${internalHasError ? styles.error : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <span className={!selectedValue ? styles.placeholder : ''}>
              {
              // Ищем label для выбранного value
              options.find((option) => option.value === selectedValue)?.label || placeholder
              }
            </span>
            {IconRight && <IconRight className={styles.iconRight} />}
          </div>
          {isOpen && (
            <motion.div
              className={`${styles.options} ${optionsStyle}`}
              initial={{ opacity: 0, y: -50 }} // Начальное состояние (невидимо и наверху)
              animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
              exit={{ opacity: 0, y: -50 }} // Анимация исчезновения (поднимается вверх)
            >
              {options.map((option) => (
                <div key={option.value} className={`${styles.option} ${optionStyle}`} onClick={(e) => !option.disabled && handleDropdownChange(e, option.value)}>
                  {option.label}
                </div>
              ))}
            </motion.div>
          )}
          {internalMessage !== '' && <div className={`${styles.message} ${internalHasError ? styles.errorText : ''}`}>{internalMessage}</div> }
        </div>
      );
    };

export default Dropdown;