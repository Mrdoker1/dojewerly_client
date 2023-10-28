import React, { memo } from 'react';
import HeroSection from './HeroSection/HeroSection';
import styles from './HomePage.module.css';
import FeaturedProductsSection from './FeaturedProductsSection/FeaturedProductsSection';
import FeaturedCollectionsSection from './FeaturedCollectionsSection/FeaturedCollectionsSection';
import InstaSection from './InstaSection/InstaSection';
import CustomBanner from '../../components/Banner/BannerHelper';
import { motion } from 'framer-motion';
import { pageTransition } from '../../animation/pageTransition'

const HomePage = memo(() => {
 
  return (
    <main className={styles.container}>
      <HeroSection></HeroSection>
      <FeaturedProductsSection></FeaturedProductsSection>
      <FeaturedCollectionsSection></FeaturedCollectionsSection>
      <CustomBanner type={'left'} ></CustomBanner>
      <CustomBanner type={'right'}></CustomBanner>
      <InstaSection></InstaSection>
      {/* Здесь будут другие секции */}
    </main>
  );
});

export default HomePage;