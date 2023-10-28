import React from 'react';
import Dropdown, { DropdownOption } from '../Dropdown';
import styles from './FilterDropdown.module.css';

interface FilterDropdownProps {
    /** Массив опций для дропдауна */
    options: DropdownOption[];
    /** Вызывается при изменении значения дропдауна */
    onChange?: (value: string) => void;
    /** Значение дропдауна */
    value?: string | number;
    /** Плейсхолдер если нет значения */
    placeholder?: string;
    /** Если `true`, дропдаун будет недоступен для ввода */
    disabled?: boolean;
    /** Дополнительные классы стилей */
    className?: string;
    /** Дополнительные классы стилей для опции списка*/
    optionStyle?: string;
    /** Дополнительные классы стилей для контейнера опций списка*/
    optionsStyle?:string
  }
  
  const FilterDropdown: React.FC<FilterDropdownProps> = ({
    options,
    onChange,
    placeholder,
    value,
    className,
    optionStyle,
    optionsStyle
}) => {
    const isDefaultValue = options.findIndex(opt => opt.value === value) === 0;
    const dropdownClassName = isDefaultValue ? styles.filerDropdown : `${styles.filerDropdown} ${styles.active}`;

    return (
        <div className={styles.container}>
            <Dropdown
                options={options}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                className={`${dropdownClassName} ${className}` }
                optionStyle={optionStyle}
                optionsStyle={optionsStyle}
            />
        </div>
    );
};
  
  export default FilterDropdown;