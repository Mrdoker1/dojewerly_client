import { useNavigate } from 'react-router-dom';
import AuthComponent from '../Auntefication/Auth';
import SignUpForm from '../Auntefication/Forms/SignUpForm/SignUpForm';
import SignInForm from '../Auntefication/Forms/SignInForm/SignInForm';
import { useTranslation } from 'react-i18next';
import InfoModal from './Modals/InfoModal/InfoModal';
import doxBanner from '../../assets/images/banner-dox.jpg';
import { useDispatch } from 'react-redux';
import { ModalType, openModal } from '../../app/reducers/modalSlice';
import { logoutUser } from '../../app/reducers/authSlice';
import { AppDispatch } from '../../app/store';
import { useModal } from './ModalProvider';

export function useCustomModal() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { closeModal } = useModal();

  // Функция для открытия модального окна
  const openModalAction = (type: ModalType) => {
    switch (type) {
      case 'signup':
        dispatch(openModal({
          type: 'signup',
          content: (
            <AuthComponent
              heading={t('Create an Account')}
              description={t('Create DoJewerly account to Save Your Favourites and Receive Bonuses!')}
              mainForm={<SignUpForm />} 
              button={{text: t('ALREADY HAVE AN ACCOUNT?')}}
              buttonIcon="arrowRight"
              buttonOnClick={() => {
                closeModal();
                openModalAction('signin');
              }}
            />
          )
        }));
        break;
      case 'signin':
        dispatch(openModal({
          type: 'signin',
          content: (
            <AuthComponent
              heading={t('Hello, Let\'s Sign In')}
              description={t('Please sign in to your DoJewerly Account.')}
              mainForm={<SignInForm onSubmit={ () => { navigate("/dashboard/profile") }} />} 
              button={{ text: t('CREATE NEW ACCOUNT')}}
              buttonIcon="arrowRight"
              buttonOnClick={() => {
                closeModal();
                openModalAction('signup');
              }}
            />
          )
        }));
        break;
      case 'dox':
        dispatch(openModal({
          type: 'dox',
          content: (
            <InfoModal
              bannerImage={doxBanner}
              heading={t('DO X Jewelry')}
              subheading={t('COOMING SOON...')}
              description={t('This will be an exclusive section! Discover unique products and special offers not found in the main catalog. Stay tuned for updates!')}
              buttonText={t('GOT IT!')}
              buttonOnClick={() => {
                closeModal();
              }}
            />
          )
        }));
        break;
      case 'expiredSession':
        dispatch(openModal({
          type: 'expiredSession',
          content: (
            <AuthComponent
              heading={t('Your acess expired!')}
              description={t('Please sign in again.')}
              mainForm={<SignInForm />} 
              buttonIcon="arrowRight"
              buttonOnClick={() => {
                closeModal();
              }}
            />
          ),
          onClose: () => {
            console.log('expiredSession closed');
            dispatch(logoutUser()).then(() => {
              // navigate('/');
              closeModal();
            });
          }
        }));
        break;
      default:
        // Обработка других типов модальных окон
        break;
    }
  };

  return { openModal: openModalAction };
}
