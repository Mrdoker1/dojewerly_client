import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../../components/Auntefication/Forms/SignInForm/SignInForm';
import banner from '../../assets/images/banner-1.jpg';
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
      heading={t('Hello, Let\'s Sign In')}
      description={t('Please sign in to your DoJewerly Account.')}
      mainForm={<SignInForm onSubmit={ () => { navigate("/dashboard/profile") }}/>}
      button={{ text: t('CREATE NEW ACCOUNT') }}
      buttonIcon="arrowRight"
      buttonOnClick={() => navigate("/signup")}
    />
  );
}

export default SignInPage;
