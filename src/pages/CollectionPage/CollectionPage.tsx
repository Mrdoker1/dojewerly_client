import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useParams } from 'react-router-dom';
import { fetchCollectionById } from '../../app/reducers/collectionsSlice';
import GradientImage from '../../components/Image/GradientImage/GradientImage';
import CollectionProductList from './CollectionProductList/CollectionProductList';
import styles from './CollectionPage.module.css';
import BackButton from '../../components/Button/BackButton/BackButton';
import { getLocalizedCollectionField } from '../../utils/getLocalizedCollectionField';
import Loader from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';

const CollectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const collection = useSelector((state: RootState) => state.collections.collections.find(coll => coll._id === id));
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const allProducts = useSelector((state: RootState) => state.products.products);
  const { t } = useTranslation();

  useEffect(() => {
    if (!collection && id) {
      dispatch(fetchCollectionById(id));
    }
  }, [id, collection, dispatch]);

  // Находим продукты, которые принадлежат этой коллекции
  const collectionProducts = useMemo(() => {
    return allProducts.filter(product => collection?.productIds.includes(product._id));
  }, [allProducts, collection]);

  // Изображение для фона из первого продукта коллекции
  const firstProductImage = useMemo(() => {
    return collectionProducts.length > 0 ? collectionProducts[0].imageURLs[0] : '';
  }, [collectionProducts]);

  if (!collection) return <Loader text={t('Loading')}/>;

  const localizedCollectionName = getLocalizedCollectionField(collection, 'name', currentLanguage);
  const localizedCollectionDescription = getLocalizedCollectionField(collection, 'description', currentLanguage);

  return (
    <div className={styles.pageWrapper}>
      <GradientImage imageUrl={firstProductImage} alt={collection.name} className={styles.gradientBackground} />
      <div className={styles.contentWrapper}>
        <BackButton fullWidth></BackButton>
        <div className={styles.heading}>
          <h1>{localizedCollectionName}</h1>
          <p className={styles.description}>{localizedCollectionDescription}</p>
        </div>
        <CollectionProductList productIds={collection.productIds} />
      </div>
    </div>
  );
};

export default CollectionPage;
