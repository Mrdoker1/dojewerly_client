import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCollection, removeProductFromCollection } from '../../../../../app/reducers/collectionsSlice';
import { AppDispatch, RootState } from '../../../../../app/store';
import styles from './AdminProductListItem.module.css';
import AdminProductListItemInfo from './AdminProductListItemInfo/AdminProductListItemInfo';
import Button from '../../../../Button/Button';
import { Product } from '../../../../../app/reducers/productsSlice';

interface AdminCollectionProductListItemProps {
    product: Product;
}

const AdminCollectionProductListItem: React.FC<AdminCollectionProductListItemProps> = ({product}) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedCollectionId = useSelector((state: RootState) => state.userDashboard.selectedCollectionId);
    const selectedCollection = useSelector((state: RootState) => state.collections.collections.find(coll => coll._id === selectedCollectionId));
    

    const handleAddProduct = () => {
        if (selectedCollection?._id)
        dispatch(addProductToCollection({ collectionId: selectedCollection._id, productId: product._id }));
    };

    const handleRemoveProduct = () => {
        if (selectedCollection?._id)
        dispatch(removeProductFromCollection({ collectionId: selectedCollection._id, productId: product._id }));
    };

    const isProductInCollection = selectedCollection?.productIds.includes(product._id);

    return (
        <div className={styles.container}>
            <AdminProductListItemInfo product={product}/>
            {isProductInCollection ? (
                <div className={styles.buttonContainer}>
                    <Button 
                        text="ADDED"
                        size="small"
                        variant="primary"
                        state="disabled"
                        iconLeft="checkmark"
                    />
                    <Button 
                        text="REMOVE"
                        size="small"
                        onClick={handleRemoveProduct}
                        variant="secondary" 
                    />
                </div>
            ) : (
                <Button 
                    text="ADD TO COLLECTION" 
                    size="small"
                    onClick={handleAddProduct}
                    variant="secondary"
                    iconLeft="plus"
                />
            )}
        </div>
    );
};

export default AdminCollectionProductListItem;