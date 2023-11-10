import React from 'react';
import styles from './VerticalBanner.module.css';
import Button from '../../Button/Button';

interface VerticalBannerProps {
  backgroundImage: string;
  color: 'light' | 'dark';
  subHeader?: string;
  title?: string;
  text?: string;
  buttonText?: string;
  onClick?: () => void;
}

const VerticalBanner: React.FC<VerticalBannerProps> = ({ backgroundImage, color, subHeader, title, text, buttonText, onClick }) => {

  const background = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  const buttonStyle = color === 'light' ? styles.whiteButton : styles.darkButton;

  return (
    <div className={styles.container} style={background} onClick={onClick}>
      <div className={`${styles.content} ${color === 'light' ? styles.light : styles.dark}`}>
        {subHeader && <h3 className={styles.bannerSubheading}>{subHeader}</h3>}
        {title && <h2 className={styles.bannerHeading}>{title}</h2>}
        {text && <div className={styles.bannerDescription}>{text}</div>}
        {buttonText && <Button className={buttonStyle} variant='secondary'>{buttonText}</Button>}
      </div>
    </div>
  );
};

export default VerticalBanner;
