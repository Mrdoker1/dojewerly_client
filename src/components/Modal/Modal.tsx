import React from 'react';
import styles from './Modal.module.css';
import icons from '../../assets/icons/icons';
import { motion } from 'framer-motion';

interface ModalProps {
  showCloseIcon?: boolean;
  onClose: (() => void) | undefined;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ showCloseIcon = true, onClose, children }) => {  

  const handleClose = (e: React.MouseEvent<SVGSVGElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Начальное состояние (невидимо и наверху)
        animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
        exit={{ opacity: 0, y: 50 }} // Анимация исчезновения (поднимается вверх)
        className={styles.modal}
        onClick={(e) =>  e.stopPropagation()}
      >
        {showCloseIcon && <icons.close className={styles.closeButton} onClick={(e) => handleClose(e)} />}
        {children}
      </motion.div>
  );
};

export default React.memo(Modal);
