import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomModal } from '../../Modal/ModalHelper';
import {
  addProductToFavourites,
  removeProductFromFavourites
} from '../../../app/reducers/favouritesSlice';
import { AppDispatch, RootState } from '../../../app/store';
import icons from '../../../assets/icons/icons';
import { sendNotification } from '../../NotificationCenter/notificationHelpers';
import { getUserProfile } from '../../../app/reducers/userSlice';
import styles from './FavouriteToggle.module.css';
import Loader from '../../Loader/Loader';

interface FavouriteToggleProps {
  productId: string;
  className?: string;
  color?: string;
}

const FavouriteToggle: React.FC<FavouriteToggleProps> = ({ productId, className, color = 'var(--white)' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.user.user);
  const [isFavourite, setIsFavourite] = useState(user?.favorites.includes(productId) || false);
  const [isLoading, setIsLoading] = useState(false);
  const { openModal } = useCustomModal();

  useEffect(() => {
    if (user) {
      setIsFavourite(user.favorites.includes(productId) || false);
    }
  }, [user, productId]);

  const toggleFavourite = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setIsLoading(true);

    if (!token) {
      console.log('TOKEN');
      openModal('signup');
      return;
    }

    if (token) {
      try {
        await dispatch(getUserProfile()).unwrap();
      } catch (error) {

      }
    }

    if (isFavourite) {
      try {
        await dispatch(removeProductFromFavourites(productId)).unwrap();
        sendNotification(dispatch, 'success', 'Product removed from favourites!');
        setIsFavourite(false);
      } catch (error) {
        sendNotification(dispatch, 'error', 'Failed to remove product from favourites.');
      }
    } else {
      try {
        await dispatch(addProductToFavourites(productId)).unwrap();
        sendNotification(dispatch, 'success', 'Product added to favourites!');
        setIsFavourite(true);
      } catch (error) {
        sendNotification(dispatch, 'error', 'Failed to add product to favourites.');
      }
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
    <div 
      className={`${styles.favouriteIcon} ${className} ${isFavourite ? styles.filled : ''}`} 
    >
      <Loader size={16}/>
  </div>
    )
  } 

  return (
    <>
      <div 
        className={`${styles.favouriteIcon} ${className} ${isFavourite ? styles.filled : ''} ${isLoading ? styles.loading : ''}`} 
        onClick={toggleFavourite}
        style={{color: color}}
      >
        <icons.heart />
      </div>
    </>
  );  
};

export default FavouriteToggle;
