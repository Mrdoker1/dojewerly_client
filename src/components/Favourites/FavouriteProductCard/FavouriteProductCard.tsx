import React from 'react';
import ProductImage from '../../Image/ProductImage/ProductImage';
import styles from './FavouriteProductCard.module.css';
import icons from '../../../assets/icons/icons';
import { useNavigate } from 'react-router-dom';
import { getLocalizedField } from '../../../utils/getLocalizedField';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Product } from '../../../app/reducers/productsSlice';
import { motion } from 'framer-motion';

interface FavouriteProductCardProps {
  product: Product;
  onRemove: (productId: string) => void; // Callback функция для удаления продукта
}

const FavouriteProductCard: React.FC<FavouriteProductCardProps> = ({ product, onRemove }) => {
  const navigate = useNavigate();
  const currentCurrency = useSelector((state: RootState) => state.currency.currentCurrency);
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  const localizedProductName = getLocalizedField(product, 'name', currentLanguage);
  const localizedProductInfo = getLocalizedField(product, 'info', currentLanguage);
  const localizedProductPrice = getLocalizedField(product, 'price', currentLanguage) as number;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(product._id);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  };

  return (
    <motion.div
      className={styles.card}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 50 }} // Начальное состояние (невидимо и наверху)
      animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
      exit={{ opacity: 0, y: 50 }} // Анимация исчезновения (поднимается вверх)
    >
      <div className={styles.infoSection}>
        <div className={styles.titleAndIcon}>
          <h3 className={styles.productName}>{localizedProductName}</h3>
          <span className={styles.heartIcon} onClick={handleHeartClick}>
            <icons.heart />
          </span>
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