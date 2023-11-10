import React, { useEffect, useState } from 'react';
import { batch, shallowEqual, useDispatch, useSelector } from 'react-redux';
import Button from '../../Button/Button';
import { fetchCatalogCriteria } from '../../../app/reducers/catalogCriteriaSlice';
import { setFilter, resetFilters, ProductQueryParams } from '../../../app/reducers/catalogSlice';
import { AppDispatch, RootState } from '../../../app/store';
import styles from './Filters.module.css'
import SearchInput from '../../Input/SearchInput/SearchInput';
import FilterDropdown from '../../Dropdown/FilterDropdown/FilterDropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import RangeSlider from '../../RangeSlider/RangeSlider';
import FiltersSkeleton from './FiltersSkeleton';
import { useTranslation } from 'react-i18next';
import icons from '../../../assets/icons/icons';
import useCombinedHeights from './useCombinedHeights';
import headerStyles from '../../Header/Header.module.css';
import topMessageStyles from '../../Messages/TopMessage/TopMessage.module.css';

const Filters = () => {
    const dispatch = useDispatch<AppDispatch>();
    const criteria = useSelector((state: RootState) => state.catalogCriteria.criteria);
    const filters = useSelector((state: RootState) => state.catalog.params, shallowEqual);
    const status = useSelector((state: RootState) => state.catalogCriteria.status);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate(); 
    const location = useLocation();
    const { t } = useTranslation();
    const [isFilterShown, setFilterShown] = useState(false);
    const stickyTopValue = useCombinedHeights([headerStyles.headerWrapper, topMessageStyles.topMessage]);

    const isAnyFilterApplied = Object.entries(filters).some(([key, value]) => {
        if (['page', 'limit', 'totalPages', 'totalProducts'].includes(key)) return false;
        return Boolean(value);
    });

    useEffect(() => {
        console.log(stickyTopValue);
        if (!criteria) {
            dispatch(fetchCatalogCriteria());
        }
    }, [criteria, dispatch, stickyTopValue]);

    const handleShowFilter = () => {
        if (isFilterShown) {
            setFilterShown(false);
        } else setFilterShown(true);
    }

    const handleFilterChange = (name: keyof ProductQueryParams, value: string | undefined, updateURL: boolean = true) => {
        console.log("Filter changed:", name, value);
        
        batch(() => {
            // Если выбрано значение "Any", установите значение в undefined
            if (['Any type', 'Any gender', 'Any material'].includes(value || '')) {
                value = undefined;
            }
            // Если фильтр не page, обновляем его значение и устанавливаем страницу на 1 в Redux
            if (name !== 'page') {
                dispatch(setFilter({ name: 'page', value: 1 }));
                dispatch(setFilter({ name, value }));
            }
        });
    
        if(updateURL) {
            const newSearchParams = new URLSearchParams(location.search);
            if (name !== 'page') {
                newSearchParams.set('page', '1'); // устанавливаем страницу на 1 в URL
            }
            if (value) {
                newSearchParams.set(String(name), value.toString());
            } else {
                newSearchParams.delete(String(name));
            }
            navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
        }
    };
    

    const handleResetFilters = () => {
        dispatch(resetFilters());
        navigate(location.pathname, { replace: true }); // Это сбросит query параметры в URL
    };

    if (status === 'loading') {
        return <FiltersSkeleton />;
    }

    if (status === 'failed') {
        return <div>Error loading filters</div>;
    }

    return (
        <div className={styles.container} style={{ top: stickyTopValue }}>
            <div className={`${styles.showFiltersButton} ${isFilterShown ? '' : styles.active}`} onClick={() => handleShowFilter()}>{t('FILTER')}<icons.filter/></div>
            <div className={`${styles.filtersWrapper} ${isFilterShown ? '' : styles.hide}`}>
                <div className={styles.filters}>
                    <FilterDropdown 
                        options={[
                            { label: t('Any material'), value: 'Any material' },
                            ...criteria?.materials.map((material: string) => ({ label: t(material), value: material })) || []
                        ]}
                        value={filters.material || 'Any material'}
                        onChange={(value) => handleFilterChange('material', value)}
                    />
                    <FilterDropdown 
                        options={[
                            { label: t('Any gender'), value: 'Any gender' },
                            ...criteria?.genders.map((gender: string) => ({ label: t(gender), value: gender })) || []
                        ]}
                        value={filters.gender || 'Any gender'}
                        onChange={(value) => handleFilterChange('gender', value)}
                    />
                    <FilterDropdown 
                        options={[
                            { label: t('Any type'), value: 'Any type' },
                            ...criteria?.types.map((type: string) => ({ label: t(type), value: type }))|| []
                        ]}
                        value={filters.type || 'Any type'}
                        onChange={(value) => handleFilterChange('type', value)}
                    />
                    <RangeSlider 
                        minValue={filters.minPrice || 0}
                        maxValue={filters.maxPrice || 1000}
                        onChange={(minValue, maxValue) => {
                            batch(() => {
                                handleFilterChange('minPrice', minValue.toString(), false);
                                handleFilterChange('maxPrice', maxValue.toString(), false);
                            });
                            // Здесь обновляем параметры URL
                            const newSearchParams = new URLSearchParams(location.search);
                            newSearchParams.set('minPrice', minValue.toString());
                            newSearchParams.set('maxPrice', maxValue.toString());
                            navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
                        }}
                    />
                    {isAnyFilterApplied && (
                        <div>
                            <Button text={t('Clear')} variant='secondary' size='small' onClick={handleResetFilters} />
                        </div>
                    )}
                </div>
                    <SearchInput
                        ref={inputRef}
                        value={filters.q || ''}
                        className={styles.searchInput}
                        containerStyle={styles.searchInputContainer}
                        iconRightClick={() => handleFilterChange('q', inputRef.current?.value || '')}
                    />
            </div>
        </div>
    );     
};

export default Filters;
