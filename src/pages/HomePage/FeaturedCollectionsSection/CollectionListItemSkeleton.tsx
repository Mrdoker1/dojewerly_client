import React from 'react';
import styles from './CollectionListItemSkeleton.module.css';

const CollectionListItemSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageSkeleton}></div>
      <div className={styles.dataSkeleton}>
        <div className={styles.nameSkeleton}></div>
        <div className={styles.descriptionSkeleton}></div>
      </div>
    </div>
  );
};

export default CollectionListItemSkeleton;
