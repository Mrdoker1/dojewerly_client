// import React from 'react';
// import noImageIcon from '../../../assets/icons/no-image-S.svg';
// import icons from '../../../assets/icons/icons';

// interface ProductImageProps {
//   imageUrl: string; // Теперь это просто имя файла изображения
//   alt: string;
//   className?: string;
//   defaultImage?: keyof typeof icons;
// }

// const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, alt, className }) => {
//   const apiUrl = process.env.REACT_APP_API_URL; // Получаем базовый URL
//   const fullImageUrl = imageUrl ? `${apiUrl}/uploads/${imageUrl}` : noImageIcon;

//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
//     const target = e.target as HTMLImageElement;
//     target.onerror = null;
//     target.src = noImageIcon;
//   };

//   return (
//     <img
//       src={fullImageUrl}
//       alt={alt}
//       className={className}
//       onError={handleImageError}
//     />
//   );
// };

// export default ProductImage;

// import React, { useState } from 'react';
// import icons from '../../../assets/icons/icons';
// import ImageSkeleton from './ImageSkeleton';

// interface ProductImageProps {
//   imageUrl: string;
//   alt: string;
//   className?: string;
//   defaultImage?: keyof typeof icons;
// }

// const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, alt, className, defaultImage }) => {
//   const apiUrl = process.env.REACT_APP_API_URL || ''; // Получаем базовый URL
//   const fullImageUrl = `${apiUrl}/uploads/${imageUrl}`;
//   const Icon = defaultImage ? icons[defaultImage] : icons['noImageS'];
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const handleImageError = () => {
//     setLoading(false);
//     setError(true);
//   };

//   const handleImageLoad = () => {
//     setLoading(false);
//   };

//   if (!imageUrl || error) {
//     return (
//       <div className={className}>
//         <Icon className={className} />
//       </div>
//     );
//   }

//   return (
//     <>
//       {loading && error ? (
//         <ImageSkeleton className={className}/>
//       ) : (
//         <img
//           src={fullImageUrl}
//           alt={alt}
//           className={className}
//           onLoad={handleImageLoad}
//           onError={handleImageError}
//         />
//       )}
//     </>
//   );
// };

// export default ProductImage;


import React, { useState } from 'react';
import icons from '../../../assets/icons/icons';
import ImageSkeleton from './ImageSkeleton';
import styles from './ProductImage.module.css'; // Импортируйте ваш CSS-модуль

interface ProductImageProps {
  imageUrl: string;
  alt: string;
  className?: string;
  defaultImage?: keyof typeof icons;
  square?: boolean
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, alt, className, defaultImage, square = false }) => {
  const apiUrl = process.env.REACT_APP_API_URL || ''; 
  const fullImageUrl = `${apiUrl}/uploads/${imageUrl}`;
  const Icon = defaultImage ? icons[defaultImage] : icons['noImageS'];
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageError = () => {
    console.log('Image error');
    setLoading(false);
    setError(true);
  };
  
  const handleImageLoad = () => {
    console.log('Image loaded');
    setLoading(false);
  };

  if (!imageUrl || error) {
    return (
      <div className={className}>
        <Icon className={className} />
      </div>
    );
  }

  return (
    <div className={square ? `${styles.aspectRatioBox} ${className}` : className}>
        <img
          src={fullImageUrl}
          alt={alt}
          className={square ? `${styles.aspectRatioBoxContent}` : className}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
    </div>
  );
};

export default ProductImage;
