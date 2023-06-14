import { useEffect } from 'react';

const useWindowSize = (callback: Function) => {
  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;

      return callback(height, width);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [callback]);
};

export default useWindowSize;
