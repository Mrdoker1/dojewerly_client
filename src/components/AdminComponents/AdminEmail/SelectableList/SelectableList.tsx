import React from 'react';
import Checkbox from '../../../Checkbox/Checkbox';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import AdminCollectionListItemInfo from '../../AdminCollection/AdminCollectionList/AdminCollectionListItem/AdminCollectionListItemInfo/AdminCollectionListItemInfo';
import AdminProductListItemInfo from '../../AdminProduct/AdminProductList/AdminProductListItem/AdminProductListItemInfo/AdminProductListItemInfo';
import { Product } from '../../../../app/reducers/productsSlice';
import { Collection } from '../../../../app/reducers/collectionsSlice';
import styles from './SelectableList.module.css'

export interface SelectableListProps {
    type: 'product' | 'collection';
    selectedIds: { productIds: string[], collectionIds: string[] };
    onSelectionChange: (selectedIds: string[]) => void;
  }
  
  const SelectableList: React.FC<SelectableListProps> = ({
    type,
    selectedIds,
    onSelectionChange
  }) => {
    const items = useSelector((state: RootState) => 
      type === 'product' ? state.products.products : state.collections.collections
    );
  
    const currentSelectedIds = type === 'product' ? selectedIds.productIds : selectedIds.collectionIds;
  
    const handleCheckboxChange = (id: string) => (isChecked: boolean) => {
        // Эта функция будет вызвана с правильным значением isChecked
        const updatedSelectedIds = isChecked
          ? [...currentSelectedIds, id] // Если чекбокс отмечен, добавляем ID
          : currentSelectedIds.filter(selectedId => selectedId !== id); // Иначе удаляем ID
      
        onSelectionChange(updatedSelectedIds); // Обновляем состояние через пропс
      };
  
    const renderItem = (item: Product | Collection) => {
      return type === 'product' ? (
        <AdminProductListItemInfo key={item._id} product={item as Product} />
      ) : (
        <AdminCollectionListItemInfo key={item._id} collection={item as Collection} />
      );
    };

    const handleItemClick = (id: string) => {
      return (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation(); // Предотвратить всплытие события
        const isChecked = !currentSelectedIds.includes(id);
        handleCheckboxChange(id)(isChecked);
      };
    };
  
    return (
      <div>
        {items.map((item) => (
          <div key={item._id} className={styles.container} onClick={item._id ? handleItemClick(item._id) : undefined}>
            {renderItem(item)}
            <div>
              <Checkbox
                checked={item._id ? currentSelectedIds.includes(item._id) : false}
                onChange={item._id ? handleCheckboxChange(item._id) : undefined}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default SelectableList;
