import { PropsWithChildren } from 'react';
import styles from './column.module.css';

const Column = ({ children }: PropsWithChildren) => {
  return <div className={styles.column}>{children}</div>;
};

export default Column;
