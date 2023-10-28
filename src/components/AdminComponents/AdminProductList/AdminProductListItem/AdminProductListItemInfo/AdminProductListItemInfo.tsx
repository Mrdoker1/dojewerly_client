import React from 'react';
import styles from './AdminProductListItemInfo.module.css';
import ProductImage from '../../../../Image/ProductImage/ProductImage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../app/store';

interface AdminProductListItemInfoProps {
    imageUrl: string;
    name: string;
    description: string;
    price: number;
  }
  

const AdminProductListItemInfo: React.FC<AdminProductListItemInfoProps> = ({ imageUrl, name, description, price }) => {

  const currentCurrency = useSelector((state: RootState) => state.currency.currentCurrency);

  return (
    <>
    <ProductImage
        imageUrl={imageUrl} // Теперь передаём только имя файла изображения
        alt={name}
        className={styles.image}
      />
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productDescription}>{description}</p>
        <p className={styles.productPrice}>{`${price.toFixed(2)} ${currentCurrency}`}</p>
      </div>
    </>
  );
};

export default AdminProductListItemInfo;