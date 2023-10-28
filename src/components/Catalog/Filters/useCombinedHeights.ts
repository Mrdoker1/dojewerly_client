import { useState, useEffect } from 'react';

const useCombinedHeights = (classNames: string[]): string => {
  const [combinedHeight, setCombinedHeight] = useState('0px');

  const calculateTotalHeight = () => {
    let totalHeight = 0;

    classNames.forEach(className => {
      const element = document.querySelector(`.${className}`) as HTMLElement;
      if (element) {
        totalHeight += element.offsetHeight;
      }
    });

    setCombinedHeight(`${totalHeight}px`);
  };

  useEffect(() => {
    calculateTotalHeight();

    // Создаем экземпляр наблюдателя
    const observer = new MutationObserver(calculateTotalHeight);

    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      // Останавливаем наблюдение при размонтировании компонента
      observer.disconnect();
    }
  }, [calculateTotalHeight, classNames]);

  return combinedHeight;
}

export default useCombinedHeights;