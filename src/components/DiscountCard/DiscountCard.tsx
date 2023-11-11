import React from 'react';
import { useSelector } from 'react-redux';
import styles from './DiscountCard.module.css'; // Предполагаем, что стили уже созданы
import icons from '../../assets/icons/icons';
import { sendNotification } from '../../components/NotificationCenter/notificationHelpers';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import cardBackgroundImage from '../../assets/images/discount.jpg'
import { useTranslation } from 'react-i18next';
import Loader from '../Loader/Loader';

const DiscountCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.user.status);
  const userId = useSelector((state: RootState) => state.user.user?._id); // Предполагаем, что id пользователя доступен в state
  const discount = useSelector((state: RootState) => state.user.user?.discount);
  const { t } = useTranslation();

  const cardStyle = {
    '--background-image': `url(${cardBackgroundImage})`
  } as React.CSSProperties;

  const handleCopyClick = () => {
    if (navigator.clipboard && userId) {
      navigator.clipboard.writeText(userId).then(() => {
        sendNotification(dispatch, 'success', 'ID copied successfully!');
      }).catch(err => {
        console.log ('Failed to copy text: ', err);
      });
    }
  };

  if (status === 'loading') {
    return <Loader text={t('Loading')}/>;
  }

  if (discount && discount > 0) return (
    <div className={styles.discountCardContainer} style={cardStyle} onClick={handleCopyClick}>
      <div className={styles.cardContent}>
        <div className={styles.logoAndId}>
          <icons.logo className={styles.logo} />
          <span className={styles.userId}>#{userId}</span>
        </div>
        <div className={styles.discountInfo}>
          <div className={styles.discount}>
            <span className={styles.discountValue}>{discount}%</span>
            <span className={styles.discountLabel}>DISCOUNT</span>
          </div>
          <p className={styles.description}>{t('Save with every purchase! Use our discount card for exclusive discounts!')}</p>
        </div>
        <div className={styles.copyIcon}>
          <icons.copy className={styles.iconCopy} />
        </div>
      </div>
    </div>
  );
};

export default DiscountCard;
