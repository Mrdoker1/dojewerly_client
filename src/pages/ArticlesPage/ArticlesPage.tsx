import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import styles from './ArticlesPage.module.css';
import ArticleListItem from './ArticleListItem/ArticleListItem';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { fetchArticles } from '../../app/reducers/articlesSlice';
import Loader from '../../components/Loader/Loader';

const ArticlesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector((state: RootState) => state.articles.articles);
  const status = useSelector((state: RootState) => state.articles.status); // Selecting the status
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Начальное состояние (невидимо и наверху)
      animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
      exit={{ opacity: 0, y: 50 }} // Анимация исчезновения (поднимается вверх)
      className={styles.container}
    >
      <div className={styles.heading}>
        <Breadcrumbs />
        <h1>{t('Articles')}</h1>
      </div>
      
      {status === 'loading' && <Loader text={t('Loading')}/>}

      {status === 'failed' && <div className={styles.errorIndicator}>Ошибка загрузки</div>}

      {status === 'succeeded' && 
        <div className={styles.collections}>
          {articles.map((article) => (
            article ? <ArticleListItem key={article._id} article={article} /> : null
          ))}
        </div>
      }
    </motion.div>
  );
};

export default ArticlesPage;
