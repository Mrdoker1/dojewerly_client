import React from 'react';
import ProductImage from '../../Image/ProductImage/ProductImage';
import FavouriteToggle from '../../Favourites/FavouriteToggle/FavouriteToggle';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { getLocalizedField } from '../../../utils/getLocalizedField';
import { Product } from '../../../app/reducers/productsSlice';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const currentCurrency = useSelector((state: RootState) => state.currency.currentCurrency);
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage); // Добавьте эту строку для получения текущего языка

  const localizedProductName = getLocalizedField(product, 'name', currentLanguage);
  const localizedProductInfo = getLocalizedField(product, 'info', currentLanguage);
  const localizedProductPrice = getLocalizedField(product, 'price', currentLanguage) as number;

  return (
    <div className={styles.productCard}>
      <Link key={product._id} to={`/product/${product._id}`}>
        <div className={styles.image}>
          <ProductImage 
            imageUrl={product.imageURLs[0]} 
            alt={product.name}
            className={styles.image}
            defaultImage='noImageL'
            square
          />
          <FavouriteToggle productId={product._id} className={styles.favouriteIcon}/>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.name}>{localizedProductName}</div>
          <div className={styles.info}>{localizedProductInfo}</div>
          <div className={styles.price}>{`${localizedProductPrice.toFixed(2)} ${currentCurrency}`}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
