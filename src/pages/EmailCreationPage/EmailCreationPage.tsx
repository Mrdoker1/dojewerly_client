import React, { useEffect } from 'react';
import styles from './EmailCreationPage.module.css';
import { motion } from 'framer-motion';
import AdminEmailDetails from '../../components/AdminComponents/AdminEmail/AdminEmailDetails/AdminEmailDetails';
import SelectableList from '../../components/AdminComponents/AdminEmail/SelectableList/SelectableList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchAllProducts } from '../../app/reducers/productsSlice';
import { fetchAllCollections } from '../../app/reducers/collectionsSlice';
import { updateCollectionIds, updateProductIds } from '../../app/reducers/emailSlice';

const EmailCreationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const emailType = useSelector((state: RootState) => state.email.emailType);
  const productIds = useSelector((state: RootState) => state.email.productIds) || [];
  const collectionIds = useSelector((state: RootState) => state.email.collectionIds) || [];

  useEffect(() => {
    if (emailType === 'product' && productIds.length === 0) {
      dispatch(fetchAllProducts({}));
    } else if (emailType === 'collection' && collectionIds.length === 0) {
      dispatch(fetchAllCollections());
    }
  }, [dispatch, emailType, productIds.length, collectionIds.length]);

  const handleProductSelectionChange = (selectedIds: string[]) => {
    dispatch(updateProductIds(selectedIds));
  };

  const handleCollectionSelectionChange = (selectedIds: string[]) => {
    dispatch(updateCollectionIds(selectedIds));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Начальное состояние (невидимо и наверху)
      animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
      exit={{ opacity: 0, y: -50 }} // Анимация исчезновения (поднимается вверх)
      className={styles.container}
    >
      <div className={styles.content}>
        <AdminEmailDetails />
          <SelectableList
            type={emailType}
            selectedIds={{ productIds, collectionIds }}
            onSelectionChange={emailType === 'product' ? handleProductSelectionChange : handleCollectionSelectionChange}
          />
      </div>
    </motion.div>
  );
};

export default EmailCreationPage;
