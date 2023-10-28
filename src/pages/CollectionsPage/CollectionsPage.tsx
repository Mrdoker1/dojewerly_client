import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCollections } from '../../app/reducers/collectionsSlice';
import { AppDispatch, RootState } from '../../app/store';
import styles from './CollectionsPage.module.css';
import CollectionListItem, { CollectionListItemProps } from './CollectionListItem/CollectionListItem';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Loader from '../../components/Loader/Loader';

const CollectionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const collections = useSelector((state: RootState) => state.collections.collections);
  const status = useSelector((state: RootState) => state.collections.status); // Selecting the status
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAllCollections());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Начальное состояние (невидимо и наверху)
      animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
      exit={{ opacity: 0, y: 50 }} // Анимация исчезновения (поднимается вверх)
      className={styles.container}
    >
      <div className={styles.heading}>
        <Breadcrumbs />
        <h1>{t('Collections')}</h1>
      </div>
      
      {status === 'loading' && <Loader text={t('Loading')}/>}

      {status === 'loading' && 
        <div className={styles.collections}>
          {Array.from({ length: 6 }).map((_, index) => (
                <></>
          ))}
        </div>
      }

      {status === 'failed' && <div className={styles.errorIndicator}>Ошибка загрузки коллекций</div>}

      {status === 'succeeded' && 
        <div className={styles.collections}>
          {collections.map((collection) => (
            collection ? <CollectionListItem key={collection._id} collection={collection as CollectionListItemProps["collection"]} /> : null
          ))}
        </div>
      }
    </motion.div>
  );
};

export default CollectionsPage;
