import React from 'react';
import styles from './SearchProductCard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Product } from '../../../../app/reducers/productsSlice';
import { AppDispatch, RootState } from '../../../../app/store';
import { getLocalizedField } from '../../../../utils/getLocalizedField';
import ProductImage from '../../../Image/ProductImage/ProductImage';
import FavouriteToggle from '../../../Favourites/FavouriteToggle/FavouriteToggle';
import { setSearchOpen } from '../../../../app/reducers/searchSlice';

interface SearchProductCardProps {
  product: Product
}

const SearchProductCard: React.FC<SearchProductCardProps> = ({ product }) => {

  const currentCurrency = useSelector((state: RootState) => state.currency.currentCurrency);
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage); // Добавьте эту строку для получения текущего языка

  const localizedProductName = getLocalizedField(product, 'name', currentLanguage);
  const localizedProductInfo = getLocalizedField(product, 'info', currentLanguage);
  const localizedProductPrice = getLocalizedField(product, 'price', currentLanguage) as number;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleProductClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const path = `/product/${product._id}`;
    navigate(path);
    dispatch(setSearchOpen(false));
  };

  return (
    <div className={styles.productCard}>
        <div className={styles.image} onClick={handleProductClick}>
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
    </div>
  );
};

export default SearchProductCard;
