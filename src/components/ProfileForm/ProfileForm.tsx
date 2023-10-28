import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { updateUserProfile } from '../../app/reducers/userSlice';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './ProfileForm.module.css';
import PasswordInput from '../Input/PasswordInput/PasswordInput';
import { sendNotification } from '../NotificationCenter/notificationHelpers';
import { useTranslation } from 'react-i18next';

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const status = useSelector((state: RootState) => state.user.status);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    setUsername(user?.username || '');
    setEmail(user?.email || '');
  }, [user]);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (e.target.value === confirmPassword && passwordMismatchError) {
      setPasswordMismatchError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === newPassword && passwordMismatchError) {
      setPasswordMismatchError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setPasswordMismatchError('Passwords do not match');
        return;
      }
    }

    const updateData: any = {
      email,
      username,
    };

    if (newPassword) {
      updateData.password = newPassword;
    }

    dispatch(updateUserProfile(updateData))
    .then((result) => {
      if (updateUserProfile.fulfilled.match(result)) {
        // Отправляем успешное уведомление
        sendNotification(dispatch, 'success', 'Profile updated successfully!');
      } else if (updateUserProfile.rejected.match(result)) {
        // Отправляем уведомление об ошибке
        sendNotification(dispatch, 'error', result.error.message || 'Something went wrong');
      }
    })
    .catch((error) => {
      // Отправляем уведомление об ошибке
      sendNotification(dispatch, 'error', error.message || 'Something went wrong');
    });
  };

  return (
    <div className={styles.info}>
      <h2>{t('Your Information')}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label={t('Username')}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label={t('Email Address')}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
        <PasswordInput
          label={t('Password')}
          value={newPassword}
          placeholder={t('Enter new password')}
          onChange={handleNewPasswordChange}
          hasError={!!passwordMismatchError}
          message={passwordMismatchError}
        />
        <PasswordInput
          label={t('Confirm Password')}
          value={confirmPassword}
          placeholder={t('Enter new password')}
          onChange={handleConfirmPasswordChange}
          hasError={!!passwordMismatchError}
          message={passwordMismatchError}
        />
        <Button type="submit" state={status === 'loading' ? 'loading' : 'default'} variant="secondary">{t('SAVE')}</Button>
      </form>
    </div>
  );
};

export default ProfileForm;