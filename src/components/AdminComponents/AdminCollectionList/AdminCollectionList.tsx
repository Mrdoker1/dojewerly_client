import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCollections, createCollection } from '../../../app/reducers/collectionsSlice';
import { AppDispatch, RootState } from '../../../app/store';
import styles from './AdminCollectionList.module.css'
import AdminCollectionListItem from './AdminCollectionListItem/AdminCollectionListItem';
import CreateItemButton from '../AdminProductList/CreateItemButton/CreateItemButton';
import { selectCollection } from '../../../app/reducers/userDashboardSlice';
import { AnimatePresence } from 'framer-motion';
import Loader from '../../Loader/Loader';
import { useTranslation } from 'react-i18next';

const AdminCollectionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const collectionList = useSelector((state: RootState) => state.collections.collections);
  const status = useSelector((state: RootState) => state.collections.status);
  const { t } = useTranslation();

  const handleCreateNewCollection = () => {
    const newCollection = {
      name: 'New Collection',
      description: 'Collection Description',
      productIds: [],
      localization: {}
    };

    dispatch(createCollection(newCollection))
    .then(response => {
      dispatch(fetchAllCollections());
      console.log('response.payload', response);
      dispatch(selectCollection(response.payload._id));
    });
  };

  useEffect(() => {
    dispatch(fetchAllCollections());
  }, [dispatch]);

  if (!collectionList || collectionList.length === 0) {
    return <Loader text={t('Loading')}/>;
  }

  return (
    <div className={styles.container}>
      <AnimatePresence>
        <CreateItemButton title={'Create new Collection'} onClick={handleCreateNewCollection}/>
        {collectionList.map((collection) => (
        <AdminCollectionListItem key={collection._id} collection={collection} /> ))}
      </AnimatePresence>
    </div>
  );
};

export default AdminCollectionList;