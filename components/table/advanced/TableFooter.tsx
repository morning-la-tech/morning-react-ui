import { HTMLProps } from 'react';
import classNames from 'classnames';
import styles from './tableFooter.module.css';

const TableFooter = ({
  className,
  ...props
}: HTMLProps<HTMLTableSectionElement>) => {
  return <tfoot {...props} className={classNames(styles.footer, className)} />;
};

export { TableFooter };
