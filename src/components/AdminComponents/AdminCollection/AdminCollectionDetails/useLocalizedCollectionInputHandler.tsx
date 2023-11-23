// hooks/useLocalizedCollectionInputHandler.ts
import { useState, useCallback, useEffect  } from 'react';
import { AppDispatch } from '../../../../app/store';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { useSelector } from 'react-redux';
import { CollectionUpdatableProperties, updateCollectionProperty } from '../../../../app/reducers/collectionsSlice';

const useLocalizedCollectionInputHandler = (selectedCollectionId: string, selectedCollection: any) => {
  const dispatch = useDispatch<AppDispatch>();

  type LocalizableCollectionProperties = 'name' | 'description';

  const currentReduxLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  const defaultCollectionLanguageSet = {
    name: currentReduxLanguage,
    description: currentReduxLanguage
  };

  const [currentLanguage, setCurrentLanguage] = useState<Record<LocalizableCollectionProperties, string>>(defaultCollectionLanguageSet);

  useEffect(() => {
    setCurrentLanguage({
      name: currentReduxLanguage,
      description: currentReduxLanguage
    });
  }, [currentReduxLanguage]);

  const handleInputChange = useCallback((property: CollectionUpdatableProperties, value: any) => {
    if (selectedCollectionId) {
      dispatch(updateCollectionProperty({ collectionId: selectedCollectionId, property, value }));
    }
  }, [selectedCollectionId, dispatch]);

  const handleLocalizedInputChange = useCallback((property: CollectionUpdatableProperties, value: any, language: string) => {
    if (selectedCollectionId && selectedCollection) {
      let updatedCollection = { ...selectedCollection };
      if (!updatedCollection.localization) {
          updatedCollection.localization = {};
      }      

      const updatedLocalization = {
        ...selectedCollection.localization,
        [language]: {
          ...selectedCollection?.localization?.[language] || { },
          [property]: value
        }
      };
      dispatch(updateCollectionProperty({ collectionId: selectedCollectionId, property: 'localization', value: updatedLocalization }));
    }
  }, [selectedCollectionId, selectedCollection, dispatch]);

  const inputDataChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>, lang: string, type: LocalizableCollectionProperties) => {
    const inputValue = e.target.value;
    lang === 'EN' ? handleInputChange(type, inputValue) : handleLocalizedInputChange(type, inputValue, currentLanguage[type]);
  }, [handleInputChange, handleLocalizedInputChange, currentLanguage]);

  const inputLanguageChangeHandler = (lang: string, type: CollectionUpdatableProperties) => {
    setCurrentLanguage(prevState => ({ ...prevState, [type]: lang }));
  };

  return {
    currentLanguage,
    inputDataChangeHandler,
    inputLanguageChangeHandler,
    setCurrentLanguage,
    handleInputChange
  };
};

export default useLocalizedCollectionInputHandler;
