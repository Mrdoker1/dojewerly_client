import React from 'react';
import styles from './ImageSkeleton.module.css';

interface ImageSkeletonProps {
  className?: string;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ className = '' }) => {
  return (
  <div className={`${className} ${styles.container}`}>
      <div className={styles.loader}></div>
  </div>
  )
};

export default ImageSkeleton;