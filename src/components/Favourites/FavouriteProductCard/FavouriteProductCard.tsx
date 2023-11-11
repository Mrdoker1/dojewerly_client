import React from 'react';
import ProductImage from '../../Image/ProductImage/ProductImage';
import styles from './FavouriteProductCard.module.css';
import { useNavigate } from 'react-router-dom';
import { getLocalizedField } from '../../../utils/getLocalizedField';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Product } from '../../../app/reducers/productsSlice';
import { motion } from 'framer-motion';
import FavouriteToggle from '../FavouriteToggle/FavouriteToggle'; // Импортируем FavouriteToggle

interface FavouriteProductCardProps {
  product: Product;
  onRemove: (productId: string) => void; // Callback функция при удалении продукта
}

const FavouriteProductCard: React.FC<FavouriteProductCardProps> = ({ product, onRemove }) => {
  const navigate = useNavigate();
  const currentCurrency = useSelector((state: RootState) => state.currency.currentCurrency);
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  const localizedProductName = getLocalizedField(product, 'name', currentLanguage);
  const localizedProductInfo = getLocalizedField(product, 'info', currentLanguage);
  const localizedProductPrice = getLocalizedField(product, 'price', currentLanguage) as number;

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  };

  return (
    <motion.div
      className={styles.card}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className={styles.infoSection}>
        <div className={styles.titleAndIcon}>
          <h3 className={styles.productName}>{localizedProductName}</h3>
          <FavouriteToggle productId={product._id} className={styles.heartIcon} />
        </div>
        <p className={styles.productDescription}>{localizedProductInfo}</p>
        <p className={styles.productPrice}>{`${localizedProductPrice.toFixed(2)} ${currentCurrency}`}</p>
      </div>
      <div className={styles.topSection}></div>
      <div className={styles.imageSection}>
        <ProductImage imageUrl={product.imageURLs[0]} alt={product.name} className={styles.productImage} />
      </div>
    </motion.div>
  );
};

export default FavouriteProductCard;
