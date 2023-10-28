import { useEffect } from 'react';

const useViewportHeight = () => {
  useEffect(() => {
    // Функция обновления высоты
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Установите начальное значение
    updateVH();

    // Добавьте обработчик событий
    window.addEventListener('resize', updateVH);

    // Удалите обработчик событий при размонтировании
    return () => {
      window.removeEventListener('resize', updateVH);
    };
  }, []);
};

export default useViewportHeight;
