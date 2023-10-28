import React, { useEffect, useState } from 'react';
import TextArea from '../TextArea';
import Dropdown from '../../Dropdown/Dropdown';
import styles from './TextAreaWithLanguage.module.css'
import createDropdownOptions from '../../../utils/createDropdownOptions';

interface TextAreaWithLanguageProps {
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

const TextAreaWithLanguage: React.FC<TextAreaWithLanguageProps> = ({
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
        />
    );

    return (
        <TextArea
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

export default TextAreaWithLanguage;
