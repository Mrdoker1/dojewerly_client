import React from 'react';
import icons from '../../assets/icons/icons';
import styles from './Button.module.css'; // Импортируем стили из модуля
import Loader from '../Loader/Loader';

export interface ButtonProps {
  /** Вызывается при клике на кнопку */
  onClick?: () => void;
  /** Текст кнопки */
  text?: string;
  /** Размер кнопки */
  size?: 'small' | 'default' | 'large';
  /** Состояния кнопки */
  state?: 'default' | 'loading' | 'disabled'; // добавляем новое свойство состояния
  /** Тип кнопки */
  type?: 'button' | 'submit' | 'reset';
  /** Дочерние элементы кнопки */
  children?: React.ReactNode;
  /** Вариант кнопки */
  variant?: 'primary' | 'secondary' | 'text';
  /** На всю ширину */
  fullWidth?: boolean;
  /** Кастомный цвет, может быть HEX кодом или переменной типа --color*/
  customColor?: string,
  /** Иконка, отображаемая слева от текста кнопки */
  iconLeft?: keyof typeof icons;
  /** Иконка, отображаемая справа от текста кнопки */
  iconRight?: keyof typeof icons;
  /** Дополнительные классы стилей для кнопки */
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button', 
  state = 'default', 
  text, 
  size = 'default', 
  onClick, 
  fullWidth, 
  customColor, 
  iconLeft, 
  iconRight, 
  children, 
  variant = 'primary', 
  className 
}) => {
  const IconLeft = iconLeft ? icons[iconLeft] : null;

  // Определяем, что будет в правой части кнопки: лоадер или иконка.
  let IconRightComponent; 
  if (state === 'loading') {
    IconRightComponent = <Loader size={16} />; // Показываем лоадер, если состояние 'loading'
  } else if (iconRight) {
    const ActualIconRight = icons[iconRight];
    IconRightComponent = <ActualIconRight style={(customColor && variant === 'primary') ? { fill: '#fff' } : {}} className={styles.icon} />;
  }

  // Определение стилей для кнопки и иконок
  const buttonStyles = (customColor && variant === 'primary')
    ? { 
        backgroundColor: customColor.startsWith('--') 
        ? `var(${customColor})` 
        : customColor,
        color: '#fff' 
      }
    : {
        color: customColor
    };

  const iconStyles = (customColor && variant === 'primary')
    ? { fill: '#fff' }
    : {};

  // Формирование классов для кнопки
  const buttonClass = customColor 
    ? `${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${styles.noHover} ${className}`
    : `${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`;

  // Отключение кнопки в зависимости от её состояния
  const isDisabled = state === 'disabled' || state === 'loading';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled} // кнопка отключается, если состояние 'disabled' или 'loading'
      style={buttonStyles}
      className={buttonClass}
    >
      {/* Отображение иконки слева, текста и дочерних компонентов */}
      {IconLeft && <IconLeft style={iconStyles} className={styles.icon} />}
      {text}
      
      {/* Отображение компонента справа (лоадер или иконка) */}
      {IconRightComponent}
      
      {children}
    </button>
  );
};

export default Button;
