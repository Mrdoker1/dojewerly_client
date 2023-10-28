import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/Auntefication/Forms/SignUpForm/SignUpForm';
import banner from '../../assets/images/banner-2.jpg';
import { useLayout } from '../../components/Layout/LayoutContext/LayoutContext';
import styles from './Auth.module.css'; // используйте один и тот же файл стилей
import AuthComponent from '../../components/Auntefication/Auth';
import { useTranslation } from 'react-i18next';

const SignInPage: React.FC = () => {
  const { setBackgroundColor } = useLayout();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setBackgroundColor(styles.background);
    return () => {
      setBackgroundColor('');
    };
  }, [setBackgroundColor]);

  return (
    <AuthComponent
      bannerImage={banner}
      heading={t('Create an Account')}
      description={t('Register New DoJeverly Account.')}
      mainForm={<SignUpForm />}
      button={{ text: t('SIGN IN TO ACCOUNT') }}
      buttonIcon="arrowRight"
      buttonOnClick={() => navigate("/signin")}
    />
  );
}

export default SignInPage;