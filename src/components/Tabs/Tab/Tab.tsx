import React from 'react';
import Button from '../../Button/Button';
import styles from './Tab.module.css'; // Импортируем стили из модуля

export interface TabProps {
  /** Заголовок вкладки */
  title: string;
  /** Если `true`, вкладка активна */
  active?: boolean;
  /** Обработчик onClick для вкладки */
  onClick?: () => void;
  /** Содержимое вкладки */
  children?: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ title, active = false, onClick, children }) => {
  return (
    <div>
      <Button
        size='default'
        text={title} 
        onClick={onClick} 
        variant={active ? 'primary' : 'text'}
        className={active ? styles.buttonTab : styles.buttonTabInactive} />
      {active && children}
    </div>
  );
};

export default Tab;