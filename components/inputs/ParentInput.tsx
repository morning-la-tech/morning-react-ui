import { forwardRef } from 'react';
import classNames from 'classnames';
import { Size } from '@/util/Enum';
import { BasicInputProps } from '@/components/inputs/types';
import styles from './parentInput.module.css';

type ParentInputProps = BasicInputProps & {
  children: React.ReactNode;
};

const ParentInput = forwardRef<HTMLDivElement, ParentInputProps>(
  ({ label, isLabelBold, sublabel, size = Size.m, children }, ref) => (
    <div ref={ref} className={classNames(styles.parentInput, styles[size])}>
      <div className={styles.labelsContainer}>
        {label && <label className={classNames(styles.label, { [styles.bold]: isLabelBold })}>{label}</label>}
        {sublabel && <div className={classNames(styles.sublabel, styles[size])}>{sublabel}</div>}
      </div>
      <div className={styles.textAreaContainer}>{children}</div>
    </div>
  ),
);

ParentInput.displayName = 'ParentInput';

export default ParentInput;
