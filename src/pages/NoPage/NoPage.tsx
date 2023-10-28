import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NoPage.module.css'
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const NoPage = memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      <h1 className={styles.heading}>{t('Sorry! Page not found')}</h1>
      <p className={styles.info} >{t('Head homepage or use the search to find what you`re looking for')}</p>
      <Button 
        onClick={() => { navigate('/');}}
        text = {t('GO TO MAIN')}
      >
      </Button >
    </motion.div>
  );
});

export default NoPage;
