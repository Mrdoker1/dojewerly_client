import React, { useEffect } from 'react';
import AdminProductListItem from './AdminProductListItem/AdminProductListItem';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, fetchAllProducts } from '../../../app/reducers/productsSlice';
import { AppDispatch, RootState } from '../../../app/store';
import styles from './AdminProductList.module.css'; 
import { selectProduct } from '../../../app/reducers/userDashboardSlice';
import CreateItemButton from './CreateItemButton/CreateItemButton';
import Loader from '../../Loader/Loader';
import { useTranslation } from 'react-i18next';

const AdminProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productList = useSelector((state: RootState) => state.products.products);
  const { t } = useTranslation();

  const handleCreateNewProduct = () => {
    const newProduct = {
      name: 'New Prdouct',
      price: 0,
      stock: 0,
      props: {
        id: 0,
        info: '',
        description: '',
        availability: '',
        material: '',
        gender: '',
        type: '',
      },
      imageURLs: [],
      localization: {}
    };

    dispatch(createProduct(newProduct))
    .then(response => {
      dispatch(fetchAllProducts({}));
      dispatch(selectProduct(response.payload._id));
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, [dispatch]);

  if (!productList || productList.length === 0) {
    return <Loader text={t('Loading')}/>;
  }

  return (
    <div className={styles.container}>
      <CreateItemButton title={'Create new product'} onClick={handleCreateNewProduct}/>
      {productList.map((product, index) => (
        product._id ? (
          <AdminProductListItem
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

export default AdminProductList;