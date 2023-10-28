import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import variables from '../../variables.module.css'
import icons from '../../assets/icons/icons';
import { Link, useNavigate } from 'react-router-dom'; // Заменим useHistory на useNavigate
import ContextMenu, { MenuItem } from '../ContextMenu/ContextMenu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logoutUser } from '../../app/reducers/authSlice';
import { AppDispatch } from '../../app/store';
import TopMessage from '../Messages/TopMessage/TopMessage';
import { setAllFilters } from '../../app/reducers/catalogSlice';
import extractParamsFromURL from '../../utils/extractParamsFromURL';
import { useLocation } from 'react-router-dom';
import LanguageDropdown from '../Dropdown/LanguageDropdown/LanguageDropdown';
import { useTranslation } from 'react-i18next';
import { useCustomModal } from '../Modal/ModalHelper';
import BurgerMenu from '../Burger/BurgerMenu';
import { AnimatePresence, motion } from 'framer-motion';
import { toggleBurgerMenu } from '../../app/reducers/menuSlice';
import { setSearchOpen } from '../../app/reducers/searchSlice';
import SearchGlobal from '../SearchGlobal/SearchGlobal';

const Header: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const isSearchOpen = useSelector((state: RootState) => state.search.isSearchOpen);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isBurgerOpen = useSelector((state: RootState) => state.menu.isBurgerOpen);

  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const { t } = useTranslation();
  const { openModal } = useCustomModal();

  const handleNavigation = (path: string) => {
    const params = extractParamsFromURL(path);
    dispatch(setAllFilters(params));
    navigate(path);
  };
  
  const handleSearchClick = () => {
    if (isSearchOpen) {
      dispatch(setSearchOpen(false));
    } else {
      dispatch(setSearchOpen(true));
    }
  };

useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
}, []);

  const handleAccountClick = () => {
    console.log('Token:', auth.token);
    if (auth.token) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      navigate('/signin');
    }
  };

  const handleLogout = () => { 
    dispatch(logoutUser()).then(() => {
        navigate('/signin');
    });
};
    // Создаем массив с пунктами меню
    const menuItems: MenuItem[] = [
      {
        label: t('Dashboard'),
        link: '/dashboard/profile', // Перенаправление на /dashboard при клике
      },
      { isDivider: true },
      {
        label: t('Logout'),
        onClick: handleLogout, // Перенаправление на /logout при клике
      }
    ];

  return (
    <>
      <motion.div
        className={`${isHomepage ? styles.fixedHeader : styles.header} ${isScrolled || isSearchOpen ? styles.solidHeader : ''}`}
        initial={{ opacity: 0 }} // Начальное состояние (невидимо и наверху)
        animate={{ opacity: 1 }} // Анимация появления (опускается вниз)
        exit={{ opacity: 0 }} // Анимация исчезновения (поднимается вверх)
      >
        <TopMessage message={t('Working in progress')} visible={true} iconRight='close'/>
        <div className={`${styles.headerWrapper}`}>
          <div className={styles.burgerIcon} onClick={() => dispatch(toggleBurgerMenu())}>
            <icons.burger />
          </div>
          <Link to="/">
            <icons.logo className={styles.logo} />
          </Link>
          <nav className={styles.menuNavigation}>
            <ul>
              <li onClick={() => handleNavigation("/catalog?page=1&type=Barrette")}>{t('barrette')}</li>
              <li onClick={() => handleNavigation("/catalog?page=1&type=Ring")}>{t('rings')}</li>
              <li onClick={() => handleNavigation("/catalog?page=1&type=Brooch")}>{t('brooch')}</li>
              <li onClick={() => handleNavigation("/collections")}>{t('collections')}</li>
              <li><LanguageDropdown></LanguageDropdown></li>
              <li className={styles.doxIcon} onClick={ () => openModal('dox') }><icons.dox/></li>
              <li onClick={handleSearchClick}>
                <icons.search/>
              </li>
              <li onClick={handleAccountClick}>
                <icons.account />
                {isMenuOpen && (
                  <ContextMenu 
                    items={menuItems} 
                    className={variables.absolute} 
                    onClose={() => setIsMenuOpen(false)}
                  />
                )}
              </li>
            </ul>
          </nav>
          <AnimatePresence>
            {isBurgerOpen && <BurgerMenu key={Date.now()}/>}
          </AnimatePresence>
        </div>
          {isSearchOpen && <SearchGlobal />}
      </motion.div>
      {isSearchOpen && <div className={styles.backdrop} onClick={handleSearchClick}></div>}
    </>
  );
};

export default Header;