import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalProductsCount } from '../../../app/reducers/productsSlice';
import { AppDispatch, RootState } from '../../../app/store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css'
import Pagination from '../Pagination/Pagination';
import { getAllProducts, setFilter, setTotalProducts } from '../../../app/reducers/catalogSlice';
import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';
import { useTranslation } from 'react-i18next';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.catalog.products);
  const productListStatus = useSelector((state: RootState) => state.catalog.status);
  const filters = useSelector((state: RootState) => state.catalog.params);
  const navigate = useNavigate();
  const location = useLocation();
  const totalPages = useSelector((state: RootState) => state.catalog.totalPages);
  const totalProducts = useSelector((state: RootState) => state.products.totalProducts);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllProducts(filters))
    dispatch(fetchTotalProductsCount(filters));
    dispatch(setTotalProducts(totalProducts));
  }, [dispatch, filters, totalProducts]);

  const handlePageChange = (page: number) => {
    //window.scrollTo(0, 0); // сброс позиции скролла к верху страницы
    dispatch(setFilter({ name: 'page', value: page }));
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('page', page.toString());
    navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
  };  

  if (productListStatus === 'loading') {
    return (
      <div className={styles.container}>
        <div className={styles.productList}>
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  } 

  if (productListStatus === 'failed') {
    return (
      <div className={styles.container}>
        <div className={styles.errorIndicator}>Ошибка загрузки продуктов</div>
      </div>);
  }

  if (products && products.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noProducts}>
          {t('No products found :( Try changing your search terms.')}
        </div>
      </div>
    );
  }
  console.log("totalProducts:", totalProducts);
  console.log("limit:", filters.limit);
  console.log("Rendering Pagination with totalPages:", totalPages);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.productList}>
          {products && products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      <Pagination 
        currentPage={Number(filters.page) || 1} 
        totalPages={Number(totalPages) || 1}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default React.memo(ProductList);
