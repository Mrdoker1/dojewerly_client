import React from 'react';
import styles from '../Modal/Modal.module.css';
import Button from '../../components/Button/Button';
import icons from '../../assets/icons/icons';
import { motion } from 'framer-motion';

interface AuthProps {
  bannerImage?: string;
  heading: string;
  description: string;
  mainForm: React.ReactNode;
  button?: {text: string};
  buttonIcon: keyof typeof icons;
  buttonOnClick: () => void;
}

const Auth: React.FC<AuthProps> = ({
  bannerImage,
  heading,
  description,
  mainForm,
  button,
  buttonIcon,
  buttonOnClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      {bannerImage &&
        <div className={styles.imageContainer}>
          <img src={bannerImage} alt="Banner" />
        </div>}
      <div className={styles.form}>
        <icons.logoText className={styles.logo} />
        <div className={styles.heading}>
          <h1>{heading}</h1>
          <div className={styles.description}>
            {description}
          </div>
        </div>
        {mainForm}
        {button && 
                <Button
                type="button"
                variant="text"
                size="default"
                fullWidth={true} 
                text={button?.text}
                iconRight={buttonIcon}
                onClick={buttonOnClick}
              />
        }
      </div>
    </motion.div>
  );
}

export default Auth;
