import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './FeaturedProductsSection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../../components/Catalog/ProductCard/ProductCard';
import { AppDispatch, RootState } from '../../../app/store';
import ProductCardSkeleton from '../../../components/Catalog/ProductCard/ProductCardSkeleton';
import { useTranslation } from 'react-i18next';
import { fetchFeaturedProducts } from '../../../app/reducers/featuredProductsSlice';

const FeaturedProductsSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.featuredProducts.products);
  const status = useSelector((state: RootState) => state.products.status); // Selecting the status
  const { t } = useTranslation();
  
    useEffect(() => {
        dispatch(fetchFeaturedProducts({includeUnavailable: false}));
    }, [dispatch]);

  return (
    <div className={styles.productSlider}>
      <div className={styles.sliderHeading}>
        <h2 className={styles.subsection}>{t('Featured Products')}</h2>
        <div className={styles.productSliderSubheading}>{t('Essential products, best values, lower prices')}</div>
      </div>
      
      {status === 'failed' && <div className={styles.errorIndicator}>Ошибка загрузки продуктов</div>}
      
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={6}
          loop={true} // Делает слайдер бесконечным
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 8,
                spaceBetween: 20,
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <ProductCard key={index} product={product} />
            </SwiperSlide>
          ))}
          {status === 'succeeded' && products.map((product, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <ProductCard key={index} product={product} />
            </SwiperSlide>
          ))}
          {status === 'loading' && Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
            <ProductCardSkeleton key={index} />
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
};

export default FeaturedProductsSection;
