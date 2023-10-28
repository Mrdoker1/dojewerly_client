import React, { FC } from 'react';
import { Product } from '../../../app/reducers/productsSlice';
import styles from './SearchResults.module.css';
import SearchProductCard from './SearchProductCard/SearchProductCard';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import ProductCardSkeleton from '../../Catalog/ProductCard/ProductCardSkeleton';
import { useNavigate } from 'react-router-dom';
import { setSearchOpen } from '../../../app/reducers/searchSlice';
import Loader from '../../Loader/Loader';

interface SearchResultsProps {
  products: Product[];
  total: number;
}

const SearchResults: FC<SearchResultsProps> = ({ products, total }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const status = useSelector((state: RootState) => state.search.status);
  const totalProducts = useSelector((state: RootState) => state.search.total);
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const navigate = useNavigate();

  const handleViewAll = (event: React.MouseEvent<HTMLInputElement>) => {
    const path = `/catalog?page=1&q=${searchQuery}`;
    navigate(path);
    dispatch(setSearchOpen(false));
  };

  // if (status === 'loading') {
  //   return (
  //     <div className={styles.container}>
  //       <div className={styles.productList}>
  //         {Array.from({ length: 4 }).map((_, index) => (
  //           <ProductCardSkeleton key={index} />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // } 

  // if (status === 'loading') {
  //   return (
  //     <div className={styles.container}>
  //       <Loader size={20}/>
  //     </div>
  //   );
  // } 

  return (
    <div className={styles.container}>
      <div className={styles.resultsCountContainer}>
        <div>{`${t('RESULTS')} ${total}`}</div>
        <div onClick={handleViewAll} className={styles.viewAllButton}>{t('VIEW ALL')}</div>
      </div>
      {(totalProducts > 0) ? (
        <div className={styles.productList}>
            {products.slice(0, 4).map((product, index) => (
                <SearchProductCard key={index} product={product} />
            ))}
        </div>) : (<div className={styles.noProducts}>{t('No products found')}</div>)}
    </div>
  );
};

export default SearchResults;
