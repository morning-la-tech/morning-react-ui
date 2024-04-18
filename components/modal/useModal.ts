import { useEffect, useState, useCallback } from 'react';

const useModal = (onClose?: () => void, closeOnEscape: boolean = true) => {
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);

  const hide = useCallback(() => {
    if (isModalShowing && onClose) {
      onClose();
    }
    setIsModalShowing(false);
  }, [isModalShowing, onClose]);

  const handleShowModal = () => {
    setIsModalShowing(true);
  };

  useEffect(() => {
    if (isModalShowing) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isModalShowing]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalShowing && closeOnEscape) {
        hide();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalShowing, hide, closeOnEscape]);

  return {
    isModalShowing,
    hide,
    handleShowModal,
  };
};

export default useModal;
