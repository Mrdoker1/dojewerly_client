import React, { memo, useEffect, useState } from 'react';
import styles from './SignInForm.module.css';
import Input from '../../../Input/Input'
import Button from '../../../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { loginUser, clearError } from '../../../../app/reducers/authSlice';
import NotificationMessage from '../../../Messages/NotificationMessage/NotificationMessage';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../../Input/PasswordInput/PasswordInput';
import { useModal } from '../../../Modal/ModalProvider';
import { MessageType } from '../../../Messages/messageTypes';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

interface SignInFormProps {
  onSubmit?: () => void;
}

const SignInForm: React.FC<SignInFormProps> = memo(({ onSubmit }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const status = useSelector((state: RootState) => state.auth.status);
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    

    // Validation of fields before sending data
    if (email.trim() === '') {
      setIsEmailValid(false);
      return;
    }

    if (password.trim() === '') {
      setIsPasswordValid(false);
      return;
    }

    // Dispatch the registerUser action
    dispatch(loginUser({ email, password })).then((result) => {
      console.log('Login result:', result.meta.requestStatus);
      if (result.meta.requestStatus === 'fulfilled') {
        closeModal();
        if (onSubmit) {
          onSubmit();
        }
      }
    });
  };

  return (
    <>
        <form className={styles.container} onSubmit={handleSubmit}>
          <Input 
            type="text"
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
              state={status === 'loading' ? 'loading' : 'default'}
              fullWidth={true}
              text={t('SIGN IN')}/>
            <AnimatePresence>
              {auth.error && <NotificationMessage 
                type={auth.error.type as MessageType}
                message={t(auth.error.message)}
                iconRight='close'
                iconRightClick={() => dispatch(clearError())}/>}
            </AnimatePresence>
          </div>
        </form>
    </>
  );
});

export default SignInForm;