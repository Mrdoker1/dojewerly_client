import React from 'react';
import styles from './CreateItemButton.module.css';
import ImageWithIcon from '../../../ImageWithIcon/ImageWithIcon';

interface CreateItemButtonProps {
  onClick?: () => void;
  title: string;
}

const CreateItemButton: React.FC<CreateItemButtonProps> = ({ title, onClick }) => {

  return (
    <div className={styles.createButton} onClick={onClick}>
        <div>
            <ImageWithIcon style={styles.image} icon={'plus'}/>
        </div>
    <h3 className={styles.createButtonTitle}>{title}</h3>
  </div>
  );
};

export default CreateItemButton;