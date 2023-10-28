import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { patchUserProfile } from '../../app/reducers/userSlice';
import Checkbox from '../../components/Checkbox/Checkbox';
import styles from './EmailSubscription.module.css';
import variables from '../../variables.module.css';
import { sendNotification } from '../NotificationCenter/notificationHelpers';
import { useTranslation } from 'react-i18next';

const EmailSubscription: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const [subscription, setSubscription] = useState(user?.settings?.email || false);
    const { t } = useTranslation();

    const handleSubscriptionChange = (newSubscription: boolean) => {
        setSubscription(newSubscription);
        dispatch(patchUserProfile({ settings: { email: newSubscription } }))
          .then((result) => {
            if (patchUserProfile.fulfilled.match(result)) {
              // Успешное обновление подписки
              sendNotification(dispatch, 'success', 'Subscription updated successfully!');
            } else if (patchUserProfile.rejected.match(result)) {
              // Ошибка при обновлении подписки
              sendNotification(dispatch, 'error', result.error.message || 'Something went wrong');
            }
          })
          .catch((error) => {
            // Обработка ошибки на стороне клиента
            sendNotification(dispatch, 'error', error.message || 'Something went wrong');
          });
    };

    useEffect(() => {
        setSubscription(user?.settings?.email || false);
    }, [user]);

    return (
        <div className={styles.subscription}>
            <h2>{t('DoJewerly Emails')}</h2>
            <p className={variables.description}>{t('By joining our email list, you will be the first to know about exciting new designs, special events, store openings and much more.')}</p>
            <Checkbox
                label={t('Check the box to subscribe to our newsletter')}
                checked={subscription}
                onChange={handleSubscriptionChange}
            />
        </div>
    );
};

export default EmailSubscription;