import React from 'react';
import InputWithLanguage from '../../../Input/InputWithLanguage/InputWithLanguage';
import TextAreaWithLanguage from '../../../TextArea/TextAreaWithLanguage/TextAreaWithLanguage';
import styles from './MainInformationSection.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import useLocalizedCollectionInputHandler from '../useLocalizedCollectionInputHandler';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '../../../../constants';

const MainInformationSection: React.FC = () => {
  const selectedCollectionId = useSelector((state: RootState) => state.userDashboard.selectedCollectionId);
  const selectedCollection = useSelector((state: RootState) => 
    state.collections.collections.find(collection => collection._id === selectedCollectionId)
  );

  const { 
    currentLanguage, 
    inputDataChangeHandler, 
    inputLanguageChangeHandler
  } = useLocalizedCollectionInputHandler(selectedCollectionId || '', selectedCollection);

  return (
    <>
      <h2>Information about Collection</h2>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <InputWithLanguage
            label="Name"
            placeholder="Collection Name"
            value={currentLanguage.name === 'EN' ? selectedCollection?.name || '' : (selectedCollection?.localization?.[currentLanguage.name]?.name || '')}
            onChange={(e, lang) => inputDataChangeHandler(e, lang, 'name')}
            onLanguageChange={(lang) => inputLanguageChangeHandler(lang, 'name') }
            languages={AVAILABLE_LANGUAGES}
            initialLanguage={currentLanguage.name}
          />
          <TextAreaWithLanguage 
            label="Description"
            placeholder="Description"
            value={currentLanguage.description === 'EN' ? selectedCollection?.description || '' : (selectedCollection?.localization?.[currentLanguage.description]?.description || '')}
            onChange={(e, lang) => inputDataChangeHandler(e, lang, 'description')}
            onLanguageChange={(lang) => inputLanguageChangeHandler(lang, 'description') }
            languages={AVAILABLE_LANGUAGES}
            initialLanguage={currentLanguage.description}
          />
        </div>
      </div>
    </>
  );
};

export default MainInformationSection;
