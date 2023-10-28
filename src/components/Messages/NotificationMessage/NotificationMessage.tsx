import React, { useEffect, useState } from 'react';
import styles from './NotificationMessage.module.css';
import icons from '../../../assets/icons/icons';
import { MessageType } from '../messageTypes';
import { motion, usePresence } from 'framer-motion';
import { removeNotification } from '../../../app/reducers/notificationSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';

export interface NotificationMessageProps {
  /** ID сообщения */
  id?: number;
  /** Тип сообщения: успех или ошибка */
  type?: MessageType;
  /** Сообщение, которое должно быть отображено */
  message?: string | null;
  /** Иконка, отображаемая справа от сообщения */
  iconRight?: keyof typeof icons;
  /** Вызывается при клике на иконку справа */
  iconRightClick?: () => void;
  /** Время в миллисекундах, после которого сообщение исчезнет */
  timeout?: number;
  /** Показывать поверх */
  absolute?: boolean;
  /** Показывать сообщение */
  visible?: boolean
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  id, type, message, iconRight, iconRightClick, timeout, absolute, visible = true 
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const IconRight = iconRight ? icons[iconRight] : null;
  const dispatch = useDispatch<AppDispatch>();
  const containerStyle = absolute ? styles.absoluteContainer : '';
  let messageStyle = '';

  switch (type) {
    case 'success':
      messageStyle = styles.successMessage;
      break;
    case 'error':
      messageStyle = styles.errorMessage;
      break;
    case 'info':
      messageStyle = styles.infoMessage;
      break;
    case 'default':
      messageStyle = styles.defaultMessage;
      break;
    default:
      messageStyle = styles.defaultMessage;
      break;
  }

  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      console.log(`Notification ${id} is no longer present in the tree`);
      safeToRemove();
    }
  }, [id, isPresent, safeToRemove]);

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();
    if (iconRightClick) {
      iconRightClick();
      console.log('iconRightClick triggered')
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout]);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible || !message) {
    if (id) {
      dispatch(removeNotification(id));
    }
  }

  console.log(id, message);

  return (
    <motion.div
      className={`${messageStyle} ${containerStyle}`}
      initial={{ opacity: 0, y: -50 }} // Начальное состояние (невидимо и наверху)
      animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
      exit={{ opacity: 0, y: -50 }} // Анимация исчезновения (поднимается вверх)
    >
      {message}
      {IconRight && <IconRight onClick={handleClose} className={styles.icon} />}
      {timeout && (
        <div 
          className={styles.timeoutBar} 
          style={{ animationDuration: `${timeout}ms` }}
        ></div>
      )}
    </motion.div>
  );
};

export default NotificationMessage;