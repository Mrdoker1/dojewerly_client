    import React, { useRef, useEffect } from 'react';
    import { useSelector } from 'react-redux';
    import { Product } from '../../../app/reducers/productsSlice';
    import { Collection } from '../../../app/reducers/collectionsSlice';

    interface CollectionImageProps {
        collectionId: string;
        className?: string;
    }

    const CollectionImage: React.FC<CollectionImageProps> = ({ collectionId, className }) => {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
        const apiUrl = process.env.REACT_APP_API_URL; // Получаем базовый URL
        
        const products = useSelector((state: any) => state.products.products);
        const collections = useSelector((state: any) => state.collections.collections);
    
        const collection = collections.find((coll: Collection) => coll._id === collectionId);
        const collectionProducts: Product[] = products.filter((product: Product) => collection?.productIds.includes(product._id || ''));

        useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
            let loadedImagesCount = 0;
            const imageElements: HTMLImageElement[] = [];

            const gridSize = Math.ceil(Math.sqrt(collectionProducts.length));
            const segmentSize = canvasRef.current.width / gridSize;

            // Дублируем изображения, чтобы заполнить холст
            const extendedProductImages = [];
            while (extendedProductImages.length < gridSize * gridSize) {
                extendedProductImages.push(...collectionProducts.map(product => product.imageURLs[0]));
            }
            // Рандомно перемешиваем изображения
            extendedProductImages.sort(() => 0.5 - Math.random());

            extendedProductImages.forEach((url, index) => {
                const img = new Image();
                const fullImageUrl = url ? `${apiUrl}/uploads/${url}` : '';
                img.src = fullImageUrl; 
                img.onload = () => {
                loadedImagesCount += 1;
                imageElements[index] = img;
    
                if (loadedImagesCount === extendedProductImages.length) {
                    imageElements.forEach((imageElem, i) => {
                    const row = Math.floor(i / gridSize);
                    const col = i % gridSize;

                    ctx.drawImage(
                        imageElem, 
                        col * segmentSize, 
                        row * segmentSize, 
                        segmentSize, 
                        segmentSize
                    );
                    });
                }
                };
            });
            }
        }
        }, [collectionProducts, apiUrl]);
    
        return <canvas ref={canvasRef} className={className} width="250" height="250" />;
    };

    export default CollectionImage;
