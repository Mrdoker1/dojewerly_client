import React from 'react';
import styles from './ProductCardSkeleton.module.css';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className={styles.productCardSkeleton}>
      <div className={styles.imageSkeleton}></div>
      <div className={styles.infoContainerSkeleton}>
        <div className={styles.nameSkeleton}></div>
        <div className={styles.infoSkeleton}></div>
        <div className={styles.priceSkeleton}></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;