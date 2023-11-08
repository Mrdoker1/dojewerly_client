import React from 'react';
import styles from './CollectionListItem.module.css';
import AdminCollectionListItemInfo from '../../../components/AdminComponents/AdminCollection/AdminCollectionList/AdminCollectionListItem/AdminCollectionListItemInfo/AdminCollectionListItemInfo';
import { useNavigate } from 'react-router-dom';
import { Collection } from '../../../app/reducers/collectionsSlice';
import { getLocalizedCollectionField } from '../../../utils/getLocalizedCollectionField';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

export interface CollectionListItemProps {
  collection: Collection
}

const CollectionListItem: React.FC<CollectionListItemProps> = ({ collection }) => {
  const navigate = useNavigate();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const localizedCollectionName = getLocalizedCollectionField(collection, 'name', currentLanguage);

  const handleSelectCollection = () => {
    navigate(`/collections/${collection._id}`); // Используйте navigate для перенаправления на страницу /dashboard
  };

return (
  <div className={styles.container} onClick={handleSelectCollection}>
    <div className={styles.collectionData}>
      <div className={styles.collectionName}>{localizedCollectionName}</div>
      <AdminCollectionListItemInfo collection={collection} onlyProducts productsToShow={4}/>
    </div>
  </div>
)};

export default CollectionListItem;
