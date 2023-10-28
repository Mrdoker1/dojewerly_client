import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from "../../../Dropdown/Dropdown";
import { fetchCatalogCriteria } from '../../../../app/reducers/catalogCriteriaSlice'; 
import { AppDispatch, RootState } from '../../../../app/store'; // Путь к вашему хранилищу Redux
import styles from './DetailsSection.module.css';
import Input from '../../../Input/Input';
import useLocalizedInputHandler from '../useLocalizedInputHandler';
import TextAreaWithLanguage from '../../../TextArea/TextAreaWithLanguage/TextAreaWithLanguage';
import createDropdownOptions from '../../../../utils/createDropdownOptions';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '../../../../constants';

interface DetailsProps {}

const DetailsSection: React.FC<DetailsProps> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const catalogCriteria = useSelector((state: RootState) => state.catalogCriteria.criteria);
    const selectedProductId = useSelector((state: RootState) => state.userDashboard.selectedProductId);
    const selectedProduct = useSelector((state: RootState) => state.products.products.find(product => product._id === state.userDashboard.selectedProductId));

    const { 
      currentLanguage, 
      inputDataChangeHandler, 
      inputLanguageChangeHandler,
      handleInputChange
  } = useLocalizedInputHandler(selectedProductId || '', selectedProduct);

    useEffect(() => {
      if (!catalogCriteria) {
        dispatch(fetchCatalogCriteria());
      }
    }, [dispatch, catalogCriteria]);

    return (
      <>
        <h2>Details</h2>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <Input 
              label="ID"
              placeholder="Product ID" 
              value={selectedProduct?.props.id.toString()}
              onChange={(e) => handleInputChange('props', Number(e.target.value), 'id')}
            />
            <Input 
              label="Amount in Stock"
              type='number'
              placeholder="In stock" 
              value={selectedProduct?.stock.toString()}
              onChange={(e) => handleInputChange('stock', Number(e.target.value))}
            />
            {/* <InputWithLanguage
              label="Amount in Stock"
              type='number'
              placeholder="In stock"
              value={currentLanguage.stock === 'EN' ? selectedProduct?.stock.toString() || '' : selectedProduct?.localization[currentLanguage.stock]?.stock?.toString() || ''}
              onChange={(e, lang) => inputDataChangeHandler(e, lang, 'stock')}
              onLanguageChange={(lang) => inputLanguageChangeHandler(lang, 'stock') }
              languages={languages}
            /> */}
          </div>
          <div className={styles.inputContainer}>
            <Dropdown 
              label="Availability" 
              value={selectedProduct?.props.availability}
              //options={catalogCriteria?.availability || []}
              options={createDropdownOptions(catalogCriteria?.availability) || []}
              placeholder='Select an option...'
              onChange={(value) => handleInputChange('props', value, 'availability')}
              fullWidth
            />
            <Dropdown 
              label="Material" 
              value={selectedProduct?.props.material}
              options={createDropdownOptions(catalogCriteria?.materials) || []} 
              placeholder='Select an option...'
              onChange={(value) => handleInputChange('props', value, 'material')}
              fullWidth
            />
          </div>
          <div className={styles.inputContainer}>
            <Dropdown 
              label="Gender" 
              value={selectedProduct?.props.gender}
              //options={catalogCriteria?.genders || []}
              options={createDropdownOptions(catalogCriteria?.genders) || []}
              placeholder='Select an option...'
              onChange={(value) => handleInputChange('props', value, 'gender')}
              fullWidth
            />
            <Dropdown 
              label="Type" 
              value={selectedProduct?.props.type}
              //options={catalogCriteria?.types || []} 
              options={createDropdownOptions(catalogCriteria?.types) || []}     
              placeholder='Select an option...'
              onChange={(value) => handleInputChange('props', value, 'type')}
              fullWidth
            />
          </div>
          {/* <TextArea
            label="Description"
            placeholder="Description" 
            value={selectedProduct?.props.description}
            onChange={(e) => handleInputChange('props', e.target.value, 'description')}
          /> */}
          <TextAreaWithLanguage
              label="Description"
              placeholder="Description"
              value={currentLanguage.description === 'EN' ? selectedProduct?.props.description || '' : (selectedProduct?.localization?.[currentLanguage.description]?.description || '')}
              onChange={(e, lang) => inputDataChangeHandler(e, lang, 'description')}
              onLanguageChange={(lang) => inputLanguageChangeHandler(lang, 'description') }
              languages={AVAILABLE_LANGUAGES}
              initialLanguage={currentLanguage.description}
            />
        </div>
      </>
    );
};

export default DetailsSection;