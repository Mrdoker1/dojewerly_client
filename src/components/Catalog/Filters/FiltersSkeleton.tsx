import React from 'react';
import styles from './FiltersSkeleton.module.css';

const FiltersSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.dropdownSkeleton}></div>
        <div className={styles.dropdownSkeleton}></div>
        <div className={styles.dropdownSkeleton}></div>
        <div className={styles.sliderSkeleton}></div>
        <div className={styles.buttonSkeleton}></div>
      </div>
      <div className={styles.searchSkeleton}></div>
    </div>
  );
};

export default FiltersSkeleton;
