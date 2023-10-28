import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';
import { useTranslation } from 'react-i18next';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface BreadcrumbsProps {
  lastLink?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ lastLink }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>{t('Home')}</Link>
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        // Получаем локализованное значение или используем значение по умолчанию
        const translatedValue = t(value) !== value ? t(value) : capitalizeFirstLetter(value);

        // Если это последний элемент и lastLink был передан, используем lastLink в качестве текста
        const breadcrumbText = isLast && lastLink ? lastLink : translatedValue;

        return (
          <span key={to}>
            {' / '}
            <Link to={to} className={isLast ? `${styles.link} ${styles.lastLink}` : styles.link}>
              {breadcrumbText}
            </Link>
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
