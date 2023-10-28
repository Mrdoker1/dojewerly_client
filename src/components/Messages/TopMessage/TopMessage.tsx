import React, { useState } from 'react';
import styles from './TopMessage.module.css';
import icons from '../../../assets/icons/icons'; // Путь может отличаться

interface TopMessageProps {
  /** Текст сообщения */
  message?: string;
  /** Показать или скрыть сообщение*/
  visible?: boolean;
  /** Иконка справа (действует как кнопка закрыть) */
  iconRight?: keyof typeof icons;
}

const TopMessage: React.FC<TopMessageProps> = ({ message, visible = true, iconRight }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const IconRight = iconRight ? icons[iconRight] : null;

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsVisible(false);
  };

  if (!isVisible || !message) {
    return null;
  }

  return (
    <div className={styles.topMessage}>
      {message}
      {IconRight && <IconRight className={styles.icon} onClick={handleClose} />} 
    </div>
  );
};

export default TopMessage;