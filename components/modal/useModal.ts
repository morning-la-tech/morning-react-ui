import { useEffect, useState, useCallback } from 'react';

const useModal = (onClose?: () => void, closeOnEscape: boolean = true) => {
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);

  const hideModal = useCallback(() => {
    if (isModalShowing && onClose) {
      onClose();
    }
    setIsModalShowing(false);
  }, [isModalShowing, onClose]);

  const handleShowModal = () => {
    setIsModalShowing(true);
  };

  const toggleModal = () => {
    setIsModalShowing(!isModalShowing);
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
        hideModal();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalShowing, hideModal, closeOnEscape]);

  return {
    isModalShowing,
    hideModal,
    handleShowModal,
    toggleModal,
  };
};

export default useModal;
