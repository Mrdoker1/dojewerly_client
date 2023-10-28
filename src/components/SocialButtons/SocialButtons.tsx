import React, { memo } from 'react';
import Button from '../Button/Button';
import styles from './SocialButtons.module.css';

const Header = memo(() => {
  return (
    <div className={styles.container}>
        <Button type="button" size="default" fullWidth={true}  text="FACEBOOK" customColor='--facebook'/>
        <Button type="button" size="default" fullWidth={true}  text="GOOGLE" customColor='--google'/>
    </div>
  );
});

export default Header;