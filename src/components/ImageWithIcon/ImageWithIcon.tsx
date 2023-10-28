import React from 'react';
import styles from './ImageWithIcon.module.css';
import icons from '../../assets/icons/icons';

interface ImageWithIconProps {
  onClick?: () => void;
  /** Иконка, отображаемая в центре */
  icon?: keyof typeof icons;
  /** Стили изображения */
  style?: string;
}

const ImageWithIcon: React.FC<ImageWithIconProps> = ({ style, icon, onClick }) => {
  const Icon = icon ? icons[icon] : null;

  return (
    <div className={`${styles.iconContainer} ${style}`} onClick={onClick}>
        {Icon && <Icon className={styles.icon} />}
    </div>
  );
};

export default ImageWithIcon;