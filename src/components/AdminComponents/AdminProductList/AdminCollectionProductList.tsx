import React, { useEffect } from 'react';
import AdminCollectionProductListItem from './AdminProductListItem/AdminCollectionProductListItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../../app/reducers/productsSlice';
import { AppDispatch, RootState } from '../../../app/store';
import styles from './AdminProductList.module.css';
import Loader from '../../Loader/Loader';
import { useTranslation } from 'react-i18next';

const AdminCollectionProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productList = useSelector((state: RootState) => state.products.products);
  const radioValue = useSelector((state: RootState) => state.userDashboard.radioValue);
  const selectedCollectionId = useSelector((state: RootState) => state.userDashboard.selectedCollectionId);
  const selectedCollection = useSelector((state: RootState) => state.collections.collections.find(coll => coll._id === selectedCollectionId));
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, [dispatch]);

  let displayedProducts = productList;

  // Если значение радиогруппы равно 'collection' (показать только продукты в коллекции)
  if (radioValue === 'collection' && selectedCollection) {
    displayedProducts = productList.filter(product => 
      product._id && selectedCollection.productIds.includes(product._id)
    );
  }

  if (!displayedProducts || displayedProducts.length === 0) {
    return <Loader text={t('Loading')}/>;
  }

  return (
    <div className={styles.container}>
      {displayedProducts.map((product) => (
        product._id ? (
          <AdminCollectionProductListItem
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.props.info}
            price={product.price}
            imageUrl={product.imageURLs[0] ? product.imageURLs[0] : ''}
          />
        ) : null
      ))}
    </div>
  );
};

export default AdminCollectionProductList;