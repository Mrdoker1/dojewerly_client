import { useModal } from './ModalProvider';
import { useNavigate } from 'react-router-dom';
import AuthComponent from '../Auntefication/Auth';
import SignUpForm from '../Auntefication/Forms/SignUpForm/SignUpForm';
import SignInForm from '../Auntefication/Forms/SignInForm/SignInForm';
import { useTranslation } from 'react-i18next';
import InfoModal from './Modals/InfoModal/InfoModal';
import doxBanner from '../../assets/images/banner-dox.jpg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { logoutUser } from '../../app/reducers/authSlice';

// Создаем пользовательский хук для открытия модального окна
export function useCustomModal() {
  const { openModalWithContent, openBlockedModalWithContent, closeModal } = useModal();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  // Функция для открытия модального окна
  const openModal = (type: 'signup' | 'signin' | 'dox' | 'expiredSession' | 'expiredLogout') => {
    switch (type) {
      case 'signup':
        openModalWithContent(
          <AuthComponent
            heading={t('Create an Account')}
            description={t('Create DoJewerly account to Save Your Favourites and Receive Bonuses!')}
            mainForm={<SignUpForm />} 
            button={{text: t('ALREADY HAVE AN ACCOUNT?')}}
            buttonIcon="arrowRight"
            buttonOnClick={() => {
              closeModal();
              openModal('signin');
              //navigate("/signin")
            }}
          />
        );
        break;
      case 'signin':
        openModalWithContent(
          <AuthComponent
            heading={t('Hello, Let\'s Sign In')}
            description={t('Please sign in to your DoJewerly Account.')}
            mainForm={<SignInForm onSubmit={ () => { navigate("/dashboard/profile") }} />} 
            button={{ text: t('CREATE NEW ACCOUNT')}}
            buttonIcon="arrowRight"
            buttonOnClick={() => {
              closeModal();
              openModal('signup');
              //navigate("/signin")
            }}
          />
        );
        break;
      case 'dox':
        openModalWithContent(
          <InfoModal
            bannerImage={doxBanner}
            heading={t('DO X Jewelry')}
            subheading={t('COOMING SOON...')}
            description={t('This will be an exclusive section! Discover unique products and special offers not found in the main catalog. Stay tuned for updates!')}
            buttonText={t('GOT IT!')}
            buttonOnClick={() => {
              closeModal();
              //navigate("/signin")
            }}
          />
        );
        break;
      case 'expiredSession':
        openBlockedModalWithContent(
          <AuthComponent
            heading={t('Your acess expired!')}
            description={t('Please sign in again.')}
            mainForm={<SignInForm />} 
            buttonIcon="arrowRight"
            buttonOnClick={() => {
              closeModal();
              //navigate("/signin")
            }}
          />
        );
        break;
        case 'expiredLogout':
          openBlockedModalWithContent(
            <InfoModal
              heading={t('Your acess has expired!')}
              description={t('Please reload page or click to Log In Again!')}
              buttonText={t('Log In Again!')}
              buttonOnClick={() => {
                closeModal();
                dispatch(logoutUser()).then(() => {
                  navigate('/signin');
              });
              }}
            />
          );
          break;
      default:
        // Обработка других типов модальных окон
        break;
    }
  };

  return { openModal };
}
