import { ChangeEvent, forwardRef } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import ParentInput from '@/components/inputs/ParentInput';
import { Size, sizeToNumber } from '@/utils/Enum';
import { InputProps } from '@/components/inputs/types';
import styles from '../input.module.css';

type TextInputProps = InputProps & {
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  imageSrc?: string;
  imageAlt?: string;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      sublabel,
      isLabelBold,
      size = Size.m,
      value,
      onChange,
      placeholder,
      isError,
      isDisabled,
      imageSrc,
      imageAlt,
    },
    ref,
  ) => {
    return (
      <ParentInput
        label={label}
        sublabel={sublabel}
        isLabelBold={isLabelBold}
        size={size}
      >
        <div className={styles.wrapper}>
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt ? imageAlt : 'input icon'}
              className={classNames(styles[size], styles.image)}
              height={sizeToNumber(size)}
              width={sizeToNumber(size)}
            />
          )}
          <input
            className={classNames(
              styles.input,
              styles[size],
              { [styles.error]: isError },
              { [styles.disabled]: isDisabled },
              { [styles.hasImage]: imageSrc },
            )}
            ref={ref}
            value={value}
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={onChange}
          />
        </div>
      </ParentInput>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
