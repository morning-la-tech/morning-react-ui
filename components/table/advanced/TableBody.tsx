import { HTMLProps } from 'react';
import React from 'react';
import classNames from 'classnames';
import { useTableContext } from './AdvancedTable';
import styles from './tableBody.module.css';

const TableBody = ({
  className,
  children,
  ...props
}: HTMLProps<HTMLTableSectionElement>) => {
  const { isLoading, skeletonRows } = useTableContext();

  const content =
    isLoading && skeletonRows
      ? Array.from({ length: skeletonRows }, (_, index) => (
          <React.Fragment key={index}>{children}</React.Fragment>
        ))
      : children;

  return (
    <tbody {...props} className={classNames(styles.tableBody, className)}>
      {content}
    </tbody>
  );
};

export { TableBody };
