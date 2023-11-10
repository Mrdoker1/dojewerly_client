import React, { memo, useState } from 'react';
import styles from './SignUpForm.module.css';
import Input from '../../../Input/Input'
import Button from '../../../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { clearError, registerUser } from '../../../../app/reducers/authSlice';
import NotificationMessage from '../../../Messages/NotificationMessage/NotificationMessage';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../../Input/PasswordInput/PasswordInput';
import { MessageType } from '../../../Messages/messageTypes';
import { sendNotification } from '../../../NotificationCenter/notificationHelpers';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

const SignUpForm = memo(() => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const status = useSelector((state: RootState) => state.auth.status);
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log(auth.error)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation of fields before sending data
    if (username.trim() === '') {
      setIsUsernameValid(false);
      return;
    }

    if (email.trim() === '') {
      setIsEmailValid(false);
      return;
    }

    if (password.trim() === '') {
      setIsPasswordValid(false);
      return;
    }

    // Dispatch the registerUser action
    dispatch(registerUser({ username, email, password })).then((result) => {
      console.log('Create account status:', result.meta.requestStatus);
      if (result.meta.requestStatus === 'fulfilled') {
        sendNotification(dispatch, 'success', 'Your account has been created successfully!');
        navigate("/signin"); // Используйте navigate для перенаправления на страницу /dashboard
      }
    });
  };

  return (
    <>
        <form className={styles.container} onSubmit={handleSubmit}>
        <Input 
            type="text"
            label={t('Username')}
            value={username}
            placeholder={t('Your name')}
            hasError={!isUsernameValid}
            message={!isUsernameValid ? 'Please enter a valid username' : ''}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsUsernameValid(true); // Reset the error flag when the user starts typing in the field
            }}
          />
          <Input 
            type="email"
            label={t('Email Address')}
            value={email}
            placeholder={t('your@email.com')}
            hasError={!isEmailValid}
            message={!isEmailValid ? 'Please enter a valid email.' : ''}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailValid(true); // Reset the error flag when the user starts typing in the field
            }}
          />
          <PasswordInput
            label={t('Password')}
            value={password}
            placeholder={t('Enter password')}
            hasError={!isPasswordValid}
            message={!isPasswordValid ? 'Please enter a valid password.' : ''}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordValid(true);
            }}
          />
          <div className={styles.buttonsContainer}>
            <Button
              type="submit"
              size="default"
              fullWidth={true}
              state={status === 'loading' ? 'loading' : 'default'}
              text={t('CREATE NEW ACCOUNT')}/>
            <AnimatePresence>
              {auth.error && <NotificationMessage 
                type={auth.error.type as MessageType}
                message={auth.error.message}
                iconRight='close'
                iconRightClick={() => dispatch(clearError())}/>}
            </AnimatePresence>
          </div>
        </form>
    </>
  );
});

export default SignUpForm;