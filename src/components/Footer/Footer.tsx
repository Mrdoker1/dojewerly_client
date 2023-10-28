import React from 'react';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../Dropdown/LanguageDropdown/LanguageDropdown';
import { useNavigate } from 'react-router-dom';
import { useCustomModal } from '../Modal/ModalHelper';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openModal } = useCustomModal();

  return (
    <div className={styles.footer}>
      <div className={styles.footerLinksMain}>
        <ul>
          <li onClick={() => { navigate("/articles/653aaef16d2b323c7bffaa21") }}>{t('Our Care Guide')}</li>
          <li onClick={() => { navigate("/articles/653abccc6d2b323c7bffac42") }}>{t('About US')}</li>
          <li onClick={ () => openModal('dox') }>Do X Jewerly</li>
          <li><LanguageDropdown></LanguageDropdown></li>
        </ul>
      </div>
      <div className={styles.footerLinksAdditional}>
        <ul>
          <li>Facebook</li>
          <li className={styles.instagram}>Instagram</li>
          <li>Snapchat</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;