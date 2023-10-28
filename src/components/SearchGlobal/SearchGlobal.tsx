import React, { FC, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchGlobal.module.css';
import { clearSearch, fetchSearchedProducts, fetchSearchedProductsCount, resetSearch, setSearchOpen, setSearchQuery } from '../../app/reducers/searchSlice';
import { AppDispatch } from '../../app/store';
import SearchResults from './SearchResults/SearchResults';
import { motion } from 'framer-motion';
import icons from '../../assets/icons/icons';

interface RootState {
  search: {
    searchQuery: string;
    total: number;
    products: any[]; // Замените 'any' на ваш тип продукта
    isSearchOpen: boolean;
  };
}

const SearchGlobal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const totalResults = useSelector((state: RootState) => state.search.total);
  const searchResults = useSelector((state: RootState) => state.search.products);
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);

  const [query, setQuery] = useState(searchQuery);

  const isSearchOpen = useSelector((state: RootState) => {
    console.log('Is search open:', state.search.isSearchOpen); // Для отладки
    return state.search.isSearchOpen;
  });

  const handleSearch = useCallback(() => {
    if (query.trim() !== '') {
      dispatch(fetchSearchedProducts(query));
      dispatch(fetchSearchedProductsCount(query));
    }
  }, [dispatch, query]);

  const handleOpenSearch = useCallback(() => {
    dispatch(setSearchOpen(true));
  }, [dispatch]);

  const handleCloseSearch = useCallback(() => {
    dispatch(resetSearch());
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    dispatch(setSearchQuery(event.target.value))
    handleSearch();
  };

  return (
    <motion.div
        
        className={styles.searchComponent}
        initial={{ opacity: 0, y: -50 }} // Начальное состояние (невидимо и наверху)
        animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
        exit={{ opacity: 0, y: -50 }} // Анимация исчезновения (поднимается вверх)
    >
      <div className={styles.container}>
        <div className={styles.searchBox}>
              <icons.search  className={styles.searchIcon} onClick={handleSearch}/>
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                className={styles.searchInput}
                placeholder={`${t("Search")}...`}
              />
              {searchQuery && (
                <icons.close className={styles.clearIcon} onClick={ () => {setQuery(''); dispatch(clearSearch())}}/>
              )}
        </div>
        {isSearchOpen && searchResults && (
          <SearchResults products={searchResults} total={totalResults} />
        )}
        </div>
    </motion.div>
  );
};

export default SearchGlobal;
