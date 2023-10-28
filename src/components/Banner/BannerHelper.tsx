import React from 'react';
import Banner from './Banner';
import backgroundOne from '../../assets/images/banner1/background.jpg';
import imageOne from '../../assets/images/banner1/image.png';
import backgroundTwo from '../../assets/images/banner2/background.jpg';
import imageTwo from '../../assets/images/banner2/image.png';

export interface CustomBannerProps {
  /** Тип баннера */
  type: 'left' | 'right';
}

const CustomBanner: React.FC<CustomBannerProps> = ({ type }) => {
  let banner;

  switch (type) {
    case 'left':
      banner = (
        <Banner
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
    case 'right':
      banner = (
        <Banner
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
  }

  return banner;
};

export default CustomBanner;
