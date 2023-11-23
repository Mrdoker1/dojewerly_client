import React from 'react';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import EmailSubscription from '../../components/EmailSubscription/EmailSubscription';
import styles from './ProfilePage.module.css';
import { motion } from 'framer-motion';
import DiscountCard from '../../components/DiscountCard/DiscountCard';

const ProfilePage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.container}
        >
            <ProfileForm />
            <div className={styles.additionalContainer}>
                <EmailSubscription />
                <DiscountCard />
            </div>
        </motion.div>
    );
};

export default ProfilePage;