import React from 'react';
import styles from './ProductCreationPage.module.css';
import AdminProductList from '../../components/AdminComponents/AdminProductList/AdminProductList';
import AdminProductDetails from '../../components/AdminComponents/AdminProductDetails/AdminProductDetails';
import { motion } from 'framer-motion';

const ProductCreationPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.container}
        >
            <div className={styles.content}>
                <AdminProductDetails />
                <AdminProductList />
            </div>
        </motion.div>
    );
};

export default ProductCreationPage;