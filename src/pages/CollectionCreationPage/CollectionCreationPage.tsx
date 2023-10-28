import React from 'react';
import styles from './CollectionCreationPage.module.css';
import AdminCollectionList from '../../components/AdminComponents/AdminCollectionList/AdminCollectionList';
import AdminCollectionDetails from '../../components/AdminComponents/AdminCollectionDetails/AdminCollectionDetails';
import { motion } from 'framer-motion';

const CollectionCreationPage = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.container}
      >
        <div className={styles.content}>
            <AdminCollectionDetails />
            <AdminCollectionList />
        </div>
      </motion.div>
    );
  };

export default CollectionCreationPage;