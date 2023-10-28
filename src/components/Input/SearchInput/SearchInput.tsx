import React from 'react';
import Input from '../Input';
import styles from './SearchInput.module.css'
import { useTranslation } from 'react-i18next';

interface SearchInputProps {
    value: string;
    hasError?: boolean;
    message?: string;
    className?: string
    containerStyle?:string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    iconRightClick?: () => void;
  }
  
  const SearchInput: React.ForwardRefRenderFunction<HTMLInputElement, SearchInputProps> = ({
    value,
    hasError,
    message,
    onChange,
    iconRightClick,
    containerStyle,
    className
    }, ref) => {
  
    const iconRight = 'search';
    const { t } = useTranslation();
  
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && iconRightClick) {
        iconRightClick();
      }
    };
  
    return (
      <Input
        ref={ref}
        type={'text'}
        value={value}
        placeholder={`${t('Search')}...`}
        hasError={hasError}
        message={message}
        iconRight={iconRight}
        iconRightClick={iconRightClick}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        containerStyle={containerStyle}
        className={`${styles.searchInput} ${className}`}
        fullWidth={false}
      />
    );
  };
  
  export default React.forwardRef(SearchInput);
  