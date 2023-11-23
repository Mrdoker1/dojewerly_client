import React from 'react';
import styles from './AdminProductListItemInfo.module.css';
import ProductImage from '../../../../../Image/ProductImage/ProductImage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../app/store';
import { Product } from '../../../../../../app/reducers/productsSlice';

interface AdminProductListItemInfoProps {
    product: Product
  }
  

const AdminProductListItemInfo: React.FC<AdminProductListItemInfoProps> = ({ product }) => {

  const currentCurrency = useSelector((state: RootState) => state.currency.currentCurrency);

  return (
    <>
    <ProductImage
        imageUrl={product.imageURLs[0] || ''} // Теперь передаём только имя файла изображения
        alt={product.name}
        className={styles.image}
      />
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{product.props.description}</p>
        <p className={styles.productPrice}>{`${product.price.toFixed(2)} ${currentCurrency}`}</p>
      </div>
    </>
  );
};

export default AdminProductListItemInfo;