import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import styles from './AdminCollectionDetails.module.css';
import MainInformationSection from './MainInformationSection/MainInformationSection';
import Button from '../../Button/Button';
import { sendNotification } from '../../NotificationCenter/notificationHelpers';
import RadioButtonGroup from '../../RadioButtonGroup/RadioButtonGroup';
import { setRadioValue } from '../../../app/reducers/userDashboardSlice';
import { updateCollectionById } from '../../../app/reducers/collectionsSlice';
import AdminCollectionProductList from '../AdminProductList/AdminCollectionProductList';
import { motion } from 'framer-motion';

const AdminCollectionDetails: React.FC = () => {
  const selectedCollectionId = useSelector((state: RootState) => state.userDashboard.selectedCollectionId);
  const selectedCollection = useSelector((state: RootState) => 
    state.collections.collections.find(collection => collection._id === selectedCollectionId)
  );

  const dispatch = useDispatch<AppDispatch>();
  const redioValue = useSelector((state: RootState) => state.userDashboard.radioValue);

  const handleRadioButtonChange = (value: string) => {
    dispatch(setRadioValue(value)); // обновляем значение радиогруппы в стейте
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCollection && selectedCollectionId) {
      dispatch(updateCollectionById({
        id: selectedCollectionId,
        collectionData: selectedCollection
      }))
      .then(resultAction => {
        if (updateCollectionById.fulfilled.match(resultAction)) {
          sendNotification(dispatch, 'success', 'Collection updated successfully!');
        } else {
          sendNotification(dispatch, 'error', 'Failed to update collection.');
        }
      });
    }
  };

  if (!selectedCollection) {
    return <div className={styles.container}>No collection selected.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Начальное состояние (невидимо и наверху)
      animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
      exit={{ opacity: 0, y: -50 }} // Анимация исчезновения (поднимается вверх)
    >
      <form onSubmit={handleSave} className={styles.container}>
        <MainInformationSection/>
        {/* Здесь может быть раздел для изображений коллекции в будущем */}
        <div className={styles.productsContainer}>
          <h2>Products in Collection</h2>
          <div className={styles.radioGroupContainer}>
            <RadioButtonGroup
              options={[
                { label: 'Show All', value: 'all' },
                { label: 'Show Only in Collection', value: 'collection' }
              ]}
              onChange={handleRadioButtonChange}
              selectedValue = {redioValue}
              orientation="horizontal"
            />
            <Button 
              text="SAVE" 
              type="submit"
              size="default"
              variant="secondary"
              fullWidth={false}
            />
          </div>
        </div>
        <AdminCollectionProductList/>
      </form>
    </motion.div>
  );
};

export default AdminCollectionDetails;