import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import styles from './AdminProductDetails.module.css';
import MainInformationSection from './MainInformationSection/MainInformationSection';
import GallerySection from './GallerySection/GallerySection';
import DetailsSection from './DetailsSection/DetailsSection';
import Button from '../../../Button/Button';
import { partialUpdateProduct } from '../../../../app/reducers/productsSlice';
import { sendNotification } from '../../../NotificationCenter/notificationHelpers';
import { motion } from 'framer-motion';

const AdminProductDetails = () => {
  const selectedProductId = useSelector((state: RootState) => state.userDashboard.selectedProductId);
  const status = useSelector((state: RootState) => state.products.status);
  const selectedProduct = useSelector((state: RootState) =>
    state.products.products.find(product => product._id === selectedProductId)
  );
  
  // Извлекаем порядок изображений
  const imagesOrder = useSelector((state: RootState) => state.userDashboard.imagesOrder);

  const dispatch: AppDispatch = useDispatch();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      let updatedProduct = { ...selectedProduct };
  
      // Если есть порядок изображений, обновляем imageURLs продукта
      if (imagesOrder.length) {
        updatedProduct = { ...updatedProduct, imageURLs: imagesOrder };
      }
  
      if (updatedProduct._id) {
        dispatch(partialUpdateProduct({ id: updatedProduct._id, updates: updatedProduct }))
          .unwrap()
          .then(() => {
            console.log('Product updated successfully');
            // Уведомление об успешном обновлении
            sendNotification(dispatch, 'success', 'Product updated successfully!');
          })
          .catch(error => {
            console.error('Failed to update product:', error);
            // Уведомление о неудачном обновлении
            sendNotification(dispatch, 'error', 'Failed to update product!');
          });
      } else {
        console.error('Product _id is undefined');
        // Уведомление о неудачном обновлении
        sendNotification(dispatch, 'error', 'Product ID is undefined!');
      }
    }
  };

  if (!selectedProduct) {
    return <div className={styles.container}>No product selected.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Начальное состояние (невидимо и наверху)
      animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
      exit={{ opacity: 0, y: -50 }} // Анимация исчезновения (поднимается вверх)
    >
      <form onSubmit={handleSave} className={styles.container}>
        <MainInformationSection/>
        <GallerySection/>
        <DetailsSection />
        <Button 
          text="SAVE" 
          type="submit"
          size="default"
          variant="secondary"
          state={status === 'loading' ? 'loading' : 'default'}
          fullWidth={false}
        />
      </form>
    </motion.div>
  );
};

export default AdminProductDetails;