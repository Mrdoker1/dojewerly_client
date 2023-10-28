import React, { useEffect } from 'react';
import styles from './BurgerMenu.module.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import icons from '../../assets/icons/icons';
import LanguageDropdown from '../Dropdown/LanguageDropdown/LanguageDropdown';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { useCustomModal } from '../Modal/ModalHelper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { closeBurgerMenu } from '../../app/reducers/menuSlice';
import useViewportHeight from './useViewportHeight';
import { setSearchOpen } from '../../app/reducers/searchSlice';

interface BurgerMenuProps {
  onClick?: () => void;
}

const menuVariants = {
  open: { x: 0 },
  closed: { x: "-100%" },
  exit: { x: "-100%", transition: { duration: 0.1 } }  // Define your exit animation here
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { openModal } = useCustomModal();

  const dispatch = useDispatch<AppDispatch>();
  const isBurgerOpen = useSelector((state: RootState) => state.menu.isBurgerOpen);
  const auth = useSelector((state: RootState) => state.auth);

  useViewportHeight();

  useEffect(() => {
    if (isBurgerOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}, [isBurgerOpen]);

  const handleNavigation = (path: string) => {
    navigate(path);
    dispatch(closeBurgerMenu())
    if (onClick){
      onClick();  // Запуск переданной функции
    }
  };

  const handleAccountClick = () => {
    dispatch(closeBurgerMenu());
    if (auth.token) {
      navigate('/dashboard/profile');
    } else {
      navigate('/signin');
    }
  };

  const handleSearchClick = () => {
    dispatch(closeBurgerMenu())
    dispatch(setSearchOpen(true));
  }

  return (
    <motion.div
      className={`${styles.burgerMenu } ${styles.show}`}
      initial="closed"
      animate={isBurgerOpen ? "open" : "closed"}
      exit="exit"
      variants={menuVariants}
    >
      <div className={styles.menuHeader}>
        <div className={styles.burgerIcon} onClick={() => dispatch(closeBurgerMenu())}>
          <icons.close />
        </div>
        <icons.logo className={styles.logo} onClick={() => handleNavigation("/")}/>
        <icons.search onClick={handleSearchClick} className={styles.searchIcon} />
      </div>
      <div className={styles.menuItemsWrapper}>  {/* Эта новая обертка */}
        <ul>
          <li onClick={() => handleNavigation("/catalog?page=1&type=Barrette")}>{t('barrette')}</li>
          <li onClick={() => handleNavigation("/catalog?page=1&type=Ring")}>{t('rings')}</li>
          <li onClick={() => handleNavigation("/catalog?page=1&type=Brooch")}>{t('brooch')}</li>
          <li onClick={() => handleNavigation("/collections")}>{t('Collections')}</li>
          <li><LanguageDropdown></LanguageDropdown></li>
          <li><Button text="DO X" variant="primary" className={styles.doxButton} onClick={ () => {dispatch(closeBurgerMenu()); openModal('dox')} }></Button></li>
          <li><Button text={t('ACCOUNT')} variant="secondary" className={styles.doxButton} onClick={handleAccountClick}></Button></li>
          {/* Добавьте другие пункты меню, если нужно */}
        </ul>
      </div>
    </motion.div>
  );
};

export default React.memo(BurgerMenu);
