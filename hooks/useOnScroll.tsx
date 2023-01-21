import { DependencyList, useEffect } from 'react';

const useOnScroll = (callback: Function, dependencies?: DependencyList) => {
  useEffect(() => {
    const handleScroll = () => {
      const yPos = window.scrollY;
      const xPos = window.scrollX;

      return callback(xPos, yPos);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, dependencies]);
};

export default useOnScroll;
