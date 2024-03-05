import { forwardRef } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import ParentInput from '@/components/inputs/ParentInput';
import { Size, sizeToNumber } from '@/util/Enum';
import styles from './input.module.css';

type InputProps = {
  label?: string;
  sublabel?: string;
  size?: Size;
  placeholder?: string;
  value?: string;
  isLabelBold?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  imageSrc?: string;
  imageAlt?: string;
};

const InputText = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, sublabel, isLabelBold, size = Size.m, value, placeholder, isError, isDisabled, imageSrc, imageAlt },
    ref,
  ) => {
    return (
      <ParentInput label={label} sublabel={sublabel} isLabelBold={isLabelBold} size={size}>
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
          />
        </div>
      </ParentInput>
    );
  },
);

InputText.displayName = 'InputText';

export default InputText;
