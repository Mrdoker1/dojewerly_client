import React from 'react';
import noImageIcon from '../../../assets/images/default-collection.png'; // Импортируйте ваш запасной вариант изображения
import styles from './GradientImage.module.css';

interface GradientImageProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

const GradientImage: React.FC<GradientImageProps> = ({ imageUrl, alt, className }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const fullImageUrl = imageUrl ? `${apiUrl}/uploads/${imageUrl}` : noImageIcon;
  const combinedClasses = [styles.gradientImage, className].join(' ');

  return (
    <div className={combinedClasses} style={{ backgroundImage: `url(${fullImageUrl})` }}>
      <div className={styles.gradientOverlay}></div>
      {/* Добавим скрытый img для доступности и SEO. Он не будет отображаться, но поможет поисковикам и технологиям вспомогательных функций */}
      <img src={fullImageUrl} alt={alt} style={{ display: 'none' }} />
    </div>
  );
};

export default GradientImage;