import React from 'react';
import styles from '../../Modal.module.css';
import Button from '../../../Button/Button';

interface DoxModalContentProps {
    buttonOnClick: () => void;
    bannerImage?: string;
    heading: string;
    subheading?: string;
    description: string;
    buttonText: string;
  }

const InfoModal: React.FC<DoxModalContentProps> = ({buttonOnClick, bannerImage, heading, subheading, description, buttonText}) => {
  return (
<div className={styles.container}>
      {bannerImage &&
        <div className={styles.imageContainer}>
          <img src={bannerImage} alt="Banner" />
        </div>}
      <div className={styles.form}>
        {subheading && <div className={styles.subheading}>{subheading}</div>}
        <h1>{heading}</h1>
        <div className={styles.description}>{description}</div>
        <Button
          type="button"
          variant="primary"
          size="default"
          fullWidth={true} 
          text={buttonText}
          onClick={buttonOnClick}
        />
      </div>
    </div>
  );
};

export default InfoModal;