import React from 'react';
import styles from './HorizontalBanner.module.css';
import Button from '../../Button/Button';

interface HorizontalBannerProps {
  /** Выбор текста слева или справа */
  type: 'left' | 'right';
  /** Изображение */
  image: string;
  /** Изображение для бэкграунда */
  backgroundImage: string;
  /** Цвет текста */
  color: 'light' | 'dark';
  /** Сабхэдер баннера */
  subHeader?: string;
  /** Текст баннера */
  text?: string;
  /** Заголовок баннера */
  title?: string;
  /** Текст кнопки */
  buttonText?: string;
  /** Обработчик клика по баннеру или кнопке */
  onClick?: () => void;
}

const HorizontalBanner: React.FC<HorizontalBannerProps> = ({ type, image, backgroundImage, color, subHeader, text, title, buttonText, onClick }) => {

  const button = color === 'light' ? <Button className={styles.whiteButton} customColor='white' variant='secondary'>{buttonText}</Button> : <Button className={styles.darkButton} variant='secondary'>{buttonText}</Button>

  const background = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <div className={styles.container} >
        <div className={styles.bannerWrapper} onClick={onClick}>
            <div style={background} className={color === 'light' ? styles.bannerImageLight : styles.bannerImageDark}></div>
            <div className={`${styles.content} ${type === 'right' ? styles.bannerLeft: styles.bannerRight}`}>
              <img className={styles.image} src={image} alt="banner" />
              <div className={`${type === 'right' ? styles.bannerTextRight : styles.bannerTextLeft} ${color === 'light' ? styles.light : styles.dark}`}>
                  {subHeader && <h3 className={styles.bannerSubheading}>{subHeader}</h3>}
                  {title && <h2 className={styles.bannerHeading}>{title}</h2>}
                  {text && <span className={styles.bannerDescription}>{text}</span>}
                  {buttonText && button}
              </div>
            </div>
        </div>
    </div>
  );
};

export default HorizontalBanner;
