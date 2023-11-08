import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCollection, Collection } from '../../../../../app/reducers/collectionsSlice';
import { selectCollection, deselectCollection } from '../../../../../app/reducers/userDashboardSlice';
import { AppDispatch, RootState } from '../../../../../app/store';
import AdminCollectionListItemInfo from './AdminCollectionListItemInfo/AdminCollectionListItemInfo';
import styles from './AdminCollectionListItem.module.css';
import icons from '../../../../../assets/icons/icons'; 
import { sendNotification } from '../../../../NotificationCenter/notificationHelpers';
import GradientImage from '../../../../Image/GradientImage/GradientImage';
import { motion } from 'framer-motion';
import Loader from '../../../../Loader/Loader';

interface AdminCollectionListItemProps {
  collection: Collection;
}

const AdminCollectionListItem: React.FC<AdminCollectionListItemProps> = ({ collection }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCollectionId = useSelector((state: RootState) => state.userDashboard.selectedCollectionId);
  const allProducts = useSelector((state: RootState) => state.products.products);
  const status = useSelector((state: RootState) => state.collections.status);

  const firstProductImage = React.useMemo(() => {
    const firstProductId = collection.productIds[0];
    const firstProduct = allProducts.find(product => product._id === firstProductId);
    return firstProduct?.imageURLs[0] || '';
  }, [collection, allProducts]);
  const TrashIcon = icons.trash;

  const handleSelectCollection = () => {
    if (collection._id) dispatch(selectCollection(collection._id));
  };

  const handleDelete = async () => {
    try {
      if (collection._id) await dispatch(deleteCollection(collection._id)).unwrap() 
      else throw new Error();
      dispatch(deselectCollection());
      sendNotification(dispatch, 'success', 'Collection deleted successfully!');
    } catch (error) {
      sendNotification(dispatch, 'error', 'Failed to delete collection!');
    }
  };

  const containerClassNames = selectedCollectionId === collection._id
    ? `${styles.container} ${styles.selected}`
    : styles.container;

  return (
    <motion.div
      className={containerClassNames}
      onClick={handleSelectCollection}
      initial={{ opacity: 0, y: -50 }} // Начальное состояние (невидимо и наверху)
      animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
      exit={{ opacity: 0, y: -50 }} // Анимация исчезновения (поднимается вверх)
    >
      <div className={styles.gradientImageContainer}>
        <GradientImage imageUrl={firstProductImage} alt="Collection Image" />
      </div>
      <div className={styles.info}>
        <AdminCollectionListItemInfo collection={collection} />
        {status === 'loading' ? <Loader size={16} className={styles.deleteIcon}/> : <TrashIcon onClick={handleDelete} className={styles.deleteIcon} />}
      </div>
    </motion.div>
  );
};

export default AdminCollectionListItem;