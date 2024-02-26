import { PropsWithChildren } from 'react';
import styles from './container.module.css';

const Container = ({ children }: PropsWithChildren) => {
  return (
    <main className={styles.container_wrapper}>
      <section className={styles.container}>{children}</section>
    </main>
  );
};

export default Container;
