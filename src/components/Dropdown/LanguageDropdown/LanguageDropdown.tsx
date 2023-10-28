import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import Dropdown from '../../Dropdown/Dropdown';
import styles from './LanguageDropdown.module.css';
import { setLanguage } from '../../../app/reducers/languageSlice'; // Путь к вашему редьюсеру языка
import createDropdownOptions from '../../../utils/createDropdownOptions';
import { AVAILABLE_LANGUAGES } from '../../../constants';

const LanguageDropdown: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
    const [languages, setLanguages] = useState<string[]>([]);

    useEffect(() => {
        // В этом месте вы будете запрашивать доступные языки с сервера.
        // Пока что используем заглушку.
        setLanguages(AVAILABLE_LANGUAGES);
    }, []);

    const handleLanguageChange = (selectedLanguage: string) => {
        dispatch(setLanguage(selectedLanguage));
    };

    return (
        <Dropdown
            value={currentLanguage}
            options={createDropdownOptions(languages) || []}
            onChange={handleLanguageChange}
            className={styles.languageDropdown}
            optionsStyle={styles.languageDropdownOptions}
            optionStyle={styles.languageDropdownOption}
        />
    );
};

export default LanguageDropdown;
