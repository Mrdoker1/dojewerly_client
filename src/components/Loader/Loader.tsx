// Loader.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Loader.module.css'; 

interface LoaderProps {
  fullScreen?: boolean;
  text?: string;
  size?: number;  // размер иконки загрузки
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = false, text, size = 24 }) => {
  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1
  };

  // Стили, зависящие от пропов, могут быть добавлены непосредственно в компоненты.
  const loaderStyle = {
    width: `${size}px`,  // используйте значение пропа size
    height: `${size}px`, // используйте значение пропа size
    borderWidth: size > 30 ? '4px' : '3px', // Например, если размер больше 30, делаем границу толще
  };

  return (
    <div className={`${styles.loaderContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      <motion.span
        className={styles.loader}
        style={loaderStyle} // применяем стили
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
      {text && <div className={styles.text}>{text}</div>}
    </div>
  );
}

export default Loader;
