import { PropsWithChildren } from 'react';
import { Properties } from 'csstype';
import styles from './container.module.css';

const Container = ({
  children,
  style,
}: PropsWithChildren & { style?: Properties }) => {
  return (
    <main className={styles.containerWrapper}>
      <section className={styles.container} style={style}>
        {children}
      </section>
    </main>
  );
};

export default Container;
