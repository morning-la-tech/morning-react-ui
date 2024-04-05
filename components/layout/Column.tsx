import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { Size } from '@/utils/Enum';
import styles from './column.module.css';

type ColumnProps = PropsWithChildren & {
  size: Size;
};

const Column = ({ children, size = Size.s }: ColumnProps) => {
  return (
    <div className={classNames(styles.column, styles[size])}>{children}</div>
  );
};

export default Column;
