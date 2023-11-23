import React from 'react';
import Button from '../../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getAllProducts } from '../../../app/reducers/catalogSlice';

const LoadMoreButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.catalog.params);
  const totalProducts = useSelector((state: RootState) => state.products.totalProducts);
  const loadedProducts = useSelector((state: RootState) => state.products.products.length);

  const remainingProducts = totalProducts - loadedProducts;

  const handleLoadMore = () => {
    // Увеличиваем номер страницы на 1 и делаем запрос
    const newFilters = { ...filters, page: (filters.page || 1) + 1 };
    dispatch(getAllProducts(newFilters));
  };

  if (remainingProducts <= 0) {
    return null;  // Если нет продуктов для загрузки, не показываем кнопку
  }

  return (
    <Button onClick={handleLoadMore} variant="secondary">
      Показать ещё ({remainingProducts})
    </Button>
  );
};

export default LoadMoreButton;
