import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Dropdown from '../../Dropdown/Dropdown';
import styles from './InputWithLanguage.module.css'
import createDropdownOptions from '../../../utils/createDropdownOptions';

interface InputWithLanguageProps {
    value: string;
    type?: string;
    placeholder?: string;
    hasError?: boolean;
    message?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, language: string) => void; // Добавлен параметр language
    onLanguageChange?: (lang: string) => void;
    label?: string;
    languages: string[];
    initialLanguage: string;
}

const InputWithLanguage: React.FC<InputWithLanguageProps> = ({
    value,
    type = 'text',
    placeholder,
    hasError,
    message,
    onChange,
    label,
    languages,
    onLanguageChange,
    initialLanguage
}) => {
    const [currentLanguage, setCurrentLanguage] = useState<string>(initialLanguage);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event, currentLanguage);
    };

    useEffect(() => {
        setCurrentLanguage(initialLanguage);
    }, [initialLanguage]);

    const handleLanguageChange = (selectedLanguage: string) => {
        setCurrentLanguage(selectedLanguage);
        if (onLanguageChange) onLanguageChange(selectedLanguage);
    };

    const languageSwitcher = (
        <Dropdown
            value={currentLanguage}
            options={createDropdownOptions(languages) || []}
            onChange={handleLanguageChange}
            className={styles.languageDropdown}
            optionStyle={styles.languageDropdownOption}
        />
    );

    return (
        <Input
            children={languageSwitcher}
            type={type}
            label={label}
            value={value}
            placeholder={placeholder}
            hasError={hasError}
            message={message}
            onChange={handleInputChange} // Используем onInputChange вместо onChange
        />
    );
};

export default InputWithLanguage;
