  import React from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { Product, deleteProduct } from '../../../../../app/reducers/productsSlice';
  import { AppDispatch, RootState } from '../../../../../app/store';
  import styles from './AdminProductListItem.module.css';
  import icons from '../../../../../assets/icons/icons';
  import { deselectProduct, selectProduct } from '../../../../../app/reducers/userDashboardSlice';
  import AdminProductListItemInfo from './AdminProductListItemInfo/AdminProductListItemInfo';
  import { sendNotification } from '../../../../NotificationCenter/notificationHelpers';
import { motion } from 'framer-motion';
import Loader from '../../../../Loader/Loader';

  interface AdminProductListItemProps {
    product: Product;
  }

  const AdminProductListItem: React.FC<AdminProductListItemProps> = ({product}) => {
    const dispatch = useDispatch<AppDispatch>();
    const TrashIcon = icons.trash;

    const handleSelectProduct = () => {
      dispatch(selectProduct(product._id)); // Вызов действия для установки выбранного продукта
    };

    const selectedProductId = useSelector((state: RootState) => state.userDashboard.selectedProductId);
    const status = useSelector((state: RootState) => state.products.status);

    const containerClassNames = selectedProductId === product._id
    ? `${styles.container} ${styles.selected}`
    : styles.container;

    const handleDelete = async () => {
      try {
        await dispatch(deleteProduct(product._id)).unwrap();
        dispatch(deselectProduct());
        sendNotification(dispatch, 'success', 'Product deleted successfully!');
      } catch (error) {
        sendNotification(dispatch, 'error', 'Failed to delete product!');
      }
    };

    return (
      <motion.div
          className={containerClassNames}
          onClick={handleSelectProduct}
          initial={{ opacity: 0, y: -50 }} // Начальное состояние (невидимо и наверху)
          animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
          exit={{ opacity: 0, y: -50 }} // Анимация исчезновения (поднимается вверх)
        >
          <AdminProductListItemInfo product={product}/>
          {status === 'loading' ? <Loader size={16} className={styles.deleteIcon}/> : <TrashIcon onClick={handleDelete} className={styles.deleteIcon} />}
      </motion.div>
    );
  };

  export default AdminProductListItem;