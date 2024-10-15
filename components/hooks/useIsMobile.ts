import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint: number = 750) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handleResize = () => setIsMobile(mediaQuery.matches);

    handleResize();

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
