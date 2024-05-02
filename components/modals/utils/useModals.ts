import { useState } from 'react';

const useModals = (closeOnClickOutside: boolean, hide: () => void) => {
  const [isMouseDownOutside, setMouseDownOutside] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    const isOutside = e.target === e.currentTarget;
    setMouseDownOutside(isOutside);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const isOutside = e.target === e.currentTarget;
    if (isMouseDownOutside && isOutside && closeOnClickOutside) {
      hide();
    }
  };
  return {
    isMouseDownOutside,
    setMouseDownOutside,
    handleMouseDown,
    handleMouseUp,
  };
};

export default useModals;
