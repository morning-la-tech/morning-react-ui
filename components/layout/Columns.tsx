import { PropsWithChildren } from 'react';
import styles from './columns.module.css';

const Columns = ({ children }: PropsWithChildren) => {
  return <div className={styles.columns}>{children}</div>;
};

export default Columns;
