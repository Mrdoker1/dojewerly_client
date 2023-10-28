import React from 'react';
import styles from './ArticleListItem.module.css';
import icons from '../../../assets/icons/icons';
import { Link } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { Article } from '../../../app/reducers/articlesSlice';
import ReactMarkdown from 'react-markdown';

export interface ArticleListItemProps {
    article: Article;
}

const ArticleListItem: React.FC<ArticleListItemProps> = ({ article }) => {
  
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  return (
    <Link key={article._id} to={`/articles/${article._id}`} className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.name}>{article.title}</h2>
          <icons.arrowRight className={styles.icon}></icons.arrowRight>
        </div>
        <ReactMarkdown className={styles.description}>{article.content}</ReactMarkdown>
    </Link>
  );
};

export default ArticleListItem;
