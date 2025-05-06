import { HTMLProps } from 'react';
import classNames from 'classnames';
import styles from './tableBody.module.css';

type TableBodySkeletonProps = HTMLProps<HTMLTableSectionElement> & {
  isLoading?: boolean;
  skeletonRows?: number;
  skeletonCols?: number;
};

const TableBody = ({
  className,
  children,
  ...props
}: TableBodySkeletonProps) => {
  return (
    <tbody {...props} className={classNames(styles.tableBody, className)}>
      {children}
    </tbody>
  );
};

export { TableBody };
