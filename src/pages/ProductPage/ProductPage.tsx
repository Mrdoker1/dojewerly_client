import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import Button from '../../components/Button/Button';
import ProductImage from '../../components/Image/ProductImage/ProductImage';
import styles from './ProductPage.module.css';
import { AppDispatch, RootState } from '../../app/store';
import { fetchProductById } from '../../app/reducers/productsSlice';
import FavouriteToggle from '../../components/Favourites/FavouriteToggle/FavouriteToggle';
import { getUserProfile } from '../../app/reducers/userSlice';
import BackButton from '../../components/Button/BackButton/BackButton';
import { getLocalizedField } from '../../utils/getLocalizedField';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Loader from '../../components/Loader/Loader';

const ProductPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const product = useSelector((state: RootState) => state.products.products.find(p => p._id === id));
    const token = useSelector((state: RootState) => state.auth.token);
    const currentCurrency = useSelector((state: RootState) => state.currency.currentCurrency);
    const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
    const { t } = useTranslation();

    useEffect(() => {
      window.scrollTo(0, 0); // сброс позиции скролла к верху страницы
      if (!product && id) {
        dispatch(fetchProductById(id));
      }
    }, [id, product, dispatch, token]);

    if (!product) return <Loader text={t('Loading')}/>;

    const localizedProductName = getLocalizedField(product, 'name', currentLanguage);
    const localizedProductDescription = getLocalizedField(product, 'description', currentLanguage);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.container}
      >
          <div className={styles.productDetailsHeadingMobile}>
              <BackButton fullWidth></BackButton>
              <h1 className={styles.productName}>{localizedProductName}</h1>
          </div>
          <div className={styles.productSection}>
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Начальное состояние (невидимо и наверху)
              animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
              exit={{ opacity: 0, y: 50 }} // Анимация исчезновения (поднимается вверх)
              className={styles.productGallery}
            >
              {product.imageURLs.length > 0 ? product.imageURLs.map((imageUrl, index) => (
                <ProductImage key={index} imageUrl={imageUrl} alt={product.name} className={styles.image} square/>
              )) : (
                <icons.noImageL className={styles.image} />
              )}
            </motion.div>
            <div className={styles.productDetailsWrapper}>
              <div className={styles.productDetails}>
                <div className={styles.productDetailsHeading}>
                  <BackButton></BackButton>
                  <h1 className={styles.productName}>{localizedProductName}</h1>
                </div>
                <ul className={styles.productProperties}>
                  <li>
                    <icons.material />
                    {`${t('Material')}: ${t(product.props.material)}`}
                  </li>
                  <li>
                    <icons.gender />
                    {`${t('Gender')}: ${t(product.props.gender)}`}
                  </li>
                  <li>
                    <icons.item />
                    {`${t('Item No.')}: ${product.props.id}`}
                  </li>
                </ul>
                <div className={styles.productDetailsDescription}>{localizedProductDescription}</div>
                <hr className={styles.solid} />
                <div className={styles.productDetailsPriceWrapper}>
                  <span className={styles.price}>{`${product.price} ${currentCurrency}`}</span>
                  <span className={styles.stock}>{`${product.stock} ${t('in stock')}`}</span>
                </div>
                <div className={styles.actions}>
                  <Button text={t('CONTACT SELLER')} size='large' fullWidth />
                  <FavouriteToggle productId={product._id} className={styles.favouriteIcon} color='black'/>
                </div>
              </div>
            </div>
          </div>
      </motion.div>
    );
};

export default ProductPage;
