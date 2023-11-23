import React from 'react';
import HorizontalBanner from './HorizontalBanner/HorizontalBanner';
import backgroundOne from '../../assets/images/banner1/background.jpg';
import imageOne from '../../assets/images/banner1/image.png';
import backgroundTwo from '../../assets/images/banner2/background.jpg';
import backgroundThree from '../../assets/images/banner-dox-2.jpg';
import imageTwo from '../../assets/images/banner2/image.png';
import VerticalBanner from './VerticalBanner/VerticalBanner';
import { useTranslation } from 'react-i18next';
import { useCustomModal } from '../Modal/ModalHelper';

export interface CustomBannerProps {
  /** Тип баннера */
  type: 'HorizontalLeft' | 'HorizontalRight' | 'Vertical';
}

const CustomBanner: React.FC<CustomBannerProps> = ({ type }) => {
  let banner;
  const { t } = useTranslation();
  const { openModal } = useCustomModal();

  switch (type) {
    case 'HorizontalLeft':
      banner = (
        <HorizontalBanner
          type='left'
          image={imageOne}
          backgroundImage={backgroundOne}
          subHeader='LIMITED OFFER'
          title='Banner Example #1'
          buttonText='CTA BUTTON'
          text='Dynamic and elusive abstraction and texture. Plays between the lines of chaos and serenity. Perfect fit for modern and contemporary styled interiors.'
          color='dark'
        />
      );
      break;
    case 'HorizontalRight':
      banner = (
        <HorizontalBanner
          type='right'
          image={imageTwo}
          backgroundImage={backgroundTwo}
          subHeader='LIMITED OFFER'
          title='Banner Example #2'
          buttonText='CTA BUTTON'
          text='Dynamic and elusive abstraction and texture. Plays between the lines of chaos and serenity. Perfect fit for modern and contemporary styled interiors.'
          color='light'
        />
      );
      break;
      case 'Vertical':
        banner = (
          <VerticalBanner
            backgroundImage={backgroundThree}
            onClick={ () => openModal('dox')}
            title='DO X Jewelry'
            text={t('Introducing unique products and special offers not found in the main catalog. Stay tuned for updates!')}
            color='light'
          />
        );
        break;
  }
  return banner;
};

export default CustomBanner;
