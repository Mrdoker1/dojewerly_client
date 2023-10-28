import React, { memo } from 'react';
import Button from '../../../components/Button/Button';
import styles from './HeroSection.module.css';
import heroVideoSrc from '../../../assets/videos/hero.mp4';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeroSection = memo(() => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeading}>
          {t('Custom jewelry for friends, family, and special occasions.')}
        </h1>
        <div className={styles.heroButtons}>
          <Button 
            text={t('SEARCH CATALOG')}
            size="large" 
            variant="primary" 
            fullWidth 
            className={styles.heroSearchCatalog}
            onClick={() => { navigate("/catalog") }}
          />
          <Button 
            text={t('READ OUR CARE GUIDE')}
            size="large" 
            variant="text"
            className={styles.heroCareGuideCTA}
            iconRight='arrowRight'
            onClick={() => { navigate("/articles/653aaef16d2b323c7bffaa21") }}
          />
        </div>
      </div>
      <div className={styles.videoWrapper}>
        <video 
          className={styles.heroVideo} 
          preload="true" 
          playsInline 
          autoPlay 
          loop 
          muted 
          src={heroVideoSrc}>
        </video>
      </div>
    </div>
  );
});

export default HeroSection;
