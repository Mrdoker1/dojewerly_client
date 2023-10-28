import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { removeNotification } from '../../app/reducers/notificationSlice';
import NotificationMessage from '../Messages/NotificationMessage/NotificationMessage';
import styles from './NotificationCenter.module.css'; // Импортируйте CSS-модуль
import { AnimatePresence } from 'framer-motion';

const NotificationCenter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector((state: RootState) => state.notification.notifications);

  const handleClose = (id: number) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className={styles.container}> {/* Используйте класс контейнера */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationMessage
            id={notification.id}
            key={notification.id}
            type={notification.type}
            message={notification.message}
            iconRight={notification.iconRight} // Иконка будет использована, если она определена
            iconRightClick={() => handleClose(notification.id)}
            timeout={notification.timeout}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;