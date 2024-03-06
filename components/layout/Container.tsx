import { PropsWithChildren } from 'react';
import styles from './container.module.css';

const Container = ({ children }: PropsWithChildren) => {
  return (
    <main className={styles.containerWrapper}>
      <section className={styles.container}>{children}</section>
    </main>
  );
};

export default Container;
