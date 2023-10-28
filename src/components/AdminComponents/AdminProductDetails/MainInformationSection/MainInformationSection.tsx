// MainInformationSection.tsx
import React from 'react';
import styles from './MainInformationSection.module.css';
import ProductImage from '../../../Image/ProductImage/ProductImage';
import { RootState } from '../../../../app/store';
import { useSelector } from 'react-redux';
import InputWithLanguage from '../../../Input/InputWithLanguage/InputWithLanguage';
import useLocalizedInputHandler from '../useLocalizedInputHandler'; // Убедитесь, что путь указан правильно
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '../../../../constants';

const MainInformationSection: React.FC = () => {
  const selectedProductId = useSelector((state: RootState) => state.userDashboard.selectedProductId);
  const selectedProduct = useSelector((state: RootState) => state.products.products.find(product => product._id === selectedProductId));

  const { 
    currentLanguage, 
    inputDataChangeHandler, 
    inputLanguageChangeHandler,
} = useLocalizedInputHandler(selectedProductId || '', selectedProduct);
  
  return (
    <>
      <h2>Main Information</h2>
      <div className={styles.container}>
        <ProductImage 
          imageUrl={selectedProduct?.imageURLs[0] || ''} 
          alt={selectedProduct?.name || 'Product image'}  
          className={styles.productImage} 
        />
        <div className={styles.infoContainer}>
          <div className={styles.namePriceContainer}>
            <InputWithLanguage
              label="Name"
              placeholder="Product Name"
              value={currentLanguage.name === 'EN' ? selectedProduct?.name || '' : (selectedProduct?.localization?.[currentLanguage.name]?.name || '')}
              onChange={(e, lang) => inputDataChangeHandler(e, lang, 'name')}
              onLanguageChange={(lang) => inputLanguageChangeHandler(lang, 'name') }
              languages={AVAILABLE_LANGUAGES}
              initialLanguage={currentLanguage.name}
            />
            <InputWithLanguage
              label="Price"
              type='number'
              placeholder="Price"
              value={currentLanguage.price === 'EN' ? selectedProduct?.price.toString() || '' : (selectedProduct?.localization?.[currentLanguage.price]?.price?.toString() || '')}
              onChange={(e, lang) => inputDataChangeHandler(e, lang, 'price')}
              onLanguageChange={(lang) => inputLanguageChangeHandler(lang, 'price') }
              languages={AVAILABLE_LANGUAGES}
              initialLanguage={currentLanguage.price}
            />
          </div>
          <InputWithLanguage
              label="Info"
              placeholder="Info"
              value={currentLanguage.info === 'EN' ? selectedProduct?.props.info || '' : (selectedProduct?.localization?.[currentLanguage.info]?.info || '')}
              onChange={(e, lang) => inputDataChangeHandler(e, lang, 'info')}
              onLanguageChange={(lang) => inputLanguageChangeHandler(lang, 'info') }
              languages={AVAILABLE_LANGUAGES}
              initialLanguage={currentLanguage.info}
            />
        </div>
      </div>
    </>
  );
};

export default MainInformationSection;
