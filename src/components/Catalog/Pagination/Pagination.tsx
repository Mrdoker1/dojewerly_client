import React from 'react';
import Button from '../../Button/Button';
import styles from './Pagination.module.css';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useTranslation();
  if (totalPages <= 1) return null;

  const numNeighborPages = 2;

  let startPage = Math.max(currentPage - numNeighborPages, 1);
  let endPage = Math.min(currentPage + numNeighborPages, totalPages);

  if (currentPage - 1 <= numNeighborPages) {
    endPage = 1 + numNeighborPages * 2;
  }

  if (totalPages - currentPage <= numNeighborPages) {
    startPage = totalPages - numNeighborPages * 2;
  }

  startPage = Math.max(startPage, 1);
  endPage = Math.min(endPage, totalPages);

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);

  return (
    <div className={styles.paginationContainer}>
      {currentPage > 1 && <Button variant={'secondary'} className={`${styles.pageButton} ${styles.firstPageButton}`} onClick={() => onPageChange(1)}>{t('First Page')}</Button>}
      {currentPage > 1 && <Button className={styles.pageButton} onClick={() => onPageChange(currentPage - 1)}>{t('Prev')}</Button>}
      {pageNumbers.map(pageNum => (
        <Button
          key={pageNum}
          variant={'secondary'}
          onClick={() => onPageChange(pageNum)}
          state={pageNum === currentPage ? 'disabled' : 'default'}
          className={`${styles.pageButton} ${pageNum === currentPage ? styles.pageActive : ''}`}
        >
          {pageNum}
        </Button>
      ))}
      {currentPage < totalPages && <Button className={styles.pageButton} onClick={() => onPageChange(currentPage + 1)}>{t('Next')}</Button>}
    </div>
  );
};

export default Pagination;
