import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Filters from '../../components/Catalog/Filters/Filters';
import ProductList from '../../components/Catalog/ProductList/ProductList';
import styles from './CatalogPage.module.css';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const CatalogPage = () => {
  const { t } = useTranslation();
  
  return (
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Начальное состояние (невидимо и наверху)
        animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
        exit={{ opacity: 0, y: 50 }} // Анимация исчезновения (поднимается вверх)
        className={styles.container}
      >
        <div className={styles.heading}>
          <Breadcrumbs />
          <h1>{t('Catalog')}</h1>
        </div>
        <Filters />
        <ProductList />
      </motion.div>
  );
};

export default React.memo(CatalogPage);