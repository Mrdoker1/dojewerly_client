import React from 'react';
import styles from './CollectionListItem.module.css';
import AdminCollectionListItemInfo from '../../../components/AdminComponents/AdminCollection/AdminCollectionList/AdminCollectionListItem/AdminCollectionListItemInfo/AdminCollectionListItemInfo';
import icons from '../../../assets/icons/icons';
import { Link } from 'react-router-dom';
import { Collection } from '../../../app/reducers/collectionsSlice';
import { getLocalizedCollectionField } from '../../../utils/getLocalizedCollectionField';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';

export interface CollectionListItemProps {
  collection: Collection;
}

const CollectionListItem: React.FC<CollectionListItemProps> = ({ collection }) => {
  
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const localizedCollectionName = getLocalizedCollectionField(collection, 'name', currentLanguage);
  const localizedCollectionDescription = getLocalizedCollectionField(collection, 'description', currentLanguage);

  return (
    <Link key={collection._id} to={`/collections/${collection._id}`} className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.name}>{localizedCollectionName}</h2>
          <icons.arrowRight></icons.arrowRight>
        </div>
        <div className={styles.description}>{localizedCollectionDescription}</div> 
        <AdminCollectionListItemInfo collection={collection} onlyProducts productsToShow={4}/>
    </Link>
  );
};

export default CollectionListItem;
