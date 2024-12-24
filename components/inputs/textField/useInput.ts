import { RefObject } from 'react';

type UseInputProps = {
  inputRef: RefObject<HTMLInputElement | null>;
};

const useInput = ({ inputRef }: UseInputProps) => {
  const handleWrapperClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return { handleWrapperClick };
};

export default useInput;
