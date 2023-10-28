import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store'; // Путь к вашему хранилищу Redux
import { deleteProductImage, addImagesToProduct } from '../../../../app/reducers/productsSlice'; // Путь к вашему слайсу продуктов
import styles from './GallerySection.module.css';
import ProductImage from '../../../Image/ProductImage/ProductImage';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import icons from '../../../../assets/icons/icons';
import { deleteImageFromOrder, setImagesOrder } from '../../../../app/reducers/userDashboardSlice';

const DraggableImage: React.FC<{ imageUrl: string; index: number; moveImage: (from: number, to: number) => void; deleteImage: (index: number) => void; }> = ({
  imageUrl,
  index,
  moveImage,
  deleteImage,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const TrashIcon = icons.trash; // Иконка корзины
  const [, refDrop] = useDrop({
    accept: 'IMAGE',
    hover: (item: { index: number }, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault(); // Предотвращение стандартного поведения кнопки
    deleteImage(index);
  };

  const [, refDrag] = useDrag({
    type: 'IMAGE',
    item: { index },
  });

  refDrag(refDrop(ref));

  return (
    <div ref={ref} className={styles.imageContainer}>
      <div className={styles.imageWrapper}>
        <ProductImage imageUrl={imageUrl} alt={`Image ${index}`} className={styles.image} />
        <TrashIcon onClick={handleDelete} className={styles.deleteIcon} /> {/* Иконка корзины */}
      </div>
    </div>
  );
};

const GallerySection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedProductId = useSelector((state: RootState) => state.userDashboard.selectedProductId);
  const selectedProduct = useSelector((state: RootState) => state.products.products.find(product => product._id === selectedProductId));
  const imagesOrder = useSelector((state: RootState) => state.userDashboard.imagesOrder);

  // Если в редюсере есть порядок изображений, используем его, иначе используем порядок из продукта
  const images = imagesOrder.length ? imagesOrder : selectedProduct?.imageURLs || [];

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newOrder = [...images];
    const [movedImage] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedImage);
  
    // Обновите Redux store с новым порядком изображений
    dispatch(setImagesOrder(newOrder));
  };

  const deleteImage = (index: number) => {
    const imageUrl = images[index];
    if (selectedProductId && imageUrl) {
      dispatch(deleteProductImage({ id: selectedProductId, imageUrl }))
        .unwrap()
        .then(() => {
          dispatch(deleteImageFromOrder(imageUrl)); // Удаление изображения из порядка
        })
        .catch(error => {
          console.error('Failed to delete image:', error);
        });
    }
  };

  const handleUploadImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && selectedProductId) {
      dispatch(addImagesToProduct({ id: selectedProductId, images: files }))
        .unwrap()
        .then((updatedProduct) => {
          if (updatedProduct && updatedProduct.updatedProduct) {
            // Обновите imagesOrder в Redux после успешной загрузки изображения
            dispatch(setImagesOrder(updatedProduct.updatedProduct.imageURLs));
          }
        });
    }
  };

  return (
    <>
    <h2>Gallery</h2>
    <DndProvider backend={HTML5Backend}>
      <div className={styles.gallery}>
        {images.map((image, index) => (
          <DraggableImage key={index} imageUrl={image} index={index} moveImage={moveImage} deleteImage={deleteImage} />
        ))}
        <div className={`${styles.imageContainer} ${styles.fileInputContainer}`}>
          <input type="file" multiple className={styles.fileInput} onChange={handleUploadImages} />
          <icons.uploadImage className={styles.uploadIcon} />
        </div>
      </div>
    </DndProvider>
    </>

  );
};

export default GallerySection;