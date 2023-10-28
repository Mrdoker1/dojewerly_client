import React from 'react';
import styles from './BackButton.module.css';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BackButtonProps {
  fullWidth?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ fullWidth = false }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    function handleBackClick(): void {
        navigate(-1);
    }

  return (
    <Button fullWidth={fullWidth} variant='text' iconLeft='arrowLeft' text={t('BACK')} onClick={handleBackClick} className={styles.Button}/>
  );
};

export default BackButton;
