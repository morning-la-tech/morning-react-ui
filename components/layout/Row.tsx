import { PropsWithChildren } from 'react';
import { PropsWithStyle } from '@/types/BaseTypes';
import styles from './row.module.css';

const Row = ({ children, style }: PropsWithChildren & PropsWithStyle) => {
  return (
    <div className={styles.row} style={style}>
      {children}
    </div>
  );
};

export default Row;
