import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import ProductCard from '../../../components/Catalog/ProductCard/ProductCard';
import styles from './CollectionProductList.module.css';
import { fetchProductById } from '../../../app/reducers/productsSlice';
import { motion } from 'framer-motion';

interface CollectionProductListProps {
  productIds: string[];
}

const CollectionProductList: React.FC<CollectionProductListProps> = ({ productIds }) => {
  const dispatch = useDispatch<AppDispatch>();
  const allProducts = useSelector((state: RootState) => state.products.products);

  // Фильтруем продукты, которые принадлежат данной коллекции
  const filteredProducts = allProducts.filter(product => productIds.includes(product._id));

  // Сортировка продуктов по порядку в productIds
  const sortedFilteredProducts = filteredProducts.sort(
    (a, b) => productIds.indexOf(a._id) - productIds.indexOf(b._id)
  );

  useEffect(() => {
    window.scrollTo(0, 0); // сброс позиции скролла к верху страницы
    // Загрузим все продукты, которые еще не загружены
    productIds.forEach(id => {
      if (!allProducts.find(product => product._id === id)) {
        dispatch(fetchProductById(id));
      }
    });
  }, [dispatch, allProducts, productIds]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Начальное состояние (невидимо и наверху)
      animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
      exit={{ opacity: 0, y: 50 }} // Анимация исчезновения (поднимается вверх)
      className={styles.container}
      >
      <div className={styles.productList}>
        {sortedFilteredProducts.length > 0 ? (
          sortedFilteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className={styles.noProducts}>
            No products found in this collection.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CollectionProductList;
