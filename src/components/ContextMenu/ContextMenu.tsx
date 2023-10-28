import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ContextMenu.module.css';
import icons from '../../assets/icons/icons';

export interface MenuItem {
  /** Название пункта меню */
  label?: string;
  /** Ссылка, на которую будет перенаправляться пользователь при клике на пункт меню (необязательное поле) */
  link?: string;
  /** Функция обратного вызова, которая будет выполняться при клике на пункт меню (необязательное поле) */
  onClick?: () => void;
  /** Ключ для выбора иконки слева от текста пункта меню (необязательное поле) */
  iconLeft?: keyof typeof icons;
  /** Ключ для выбора иконки справа от текста пункта меню (необязательное поле) */
  iconRight?: keyof typeof icons;
  /** Если установлено в true, пункт меню будет служить разделителем (необязательное поле) */
  isDivider?: boolean;
}

export interface ContextMenuProps {
  items: MenuItem[];
  onClose?: () => void;
  className?: string; 
}

const ContextMenu: React.FC<ContextMenuProps> = ({ items, onClose, className  }) => {

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (onClose) {
          onClose();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);


  return (
    <div ref={menuRef} className={`${styles.userMenu} ${className}`}>
      {items.map((item, index) => (
        item.isDivider ? (
          <div key={index} className={styles.divider} />
        ) : (
          <div key={index} className={styles.menuItem}>
            {item.iconLeft && icons[item.iconLeft] && (
              <span className={styles.icon}>
                {React.createElement(icons[item.iconLeft])}
              </span>
            )}
            {item.link ? (
              <Link to={item.link} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <button type="button" onClick={item.onClick} className={styles.button}>
                {item.label}
              </button>
            )}
            {item.iconRight && icons[item.iconRight] && (
              <span className={styles.icon}>
                {React.createElement(icons[item.iconRight])}
              </span>
            )}
          </div>
        )
      ))}
    </div>
  );
};

export default ContextMenu;