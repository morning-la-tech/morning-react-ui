import { PropsWithChildren } from 'react';
import Link from 'next/link';
import styles from './header.module.css';

const Navigation = ({ children }: PropsWithChildren) => {
  return (
    <nav className={styles.bar}>
      <div className={styles.container}>
        <Link href={'/'}>Home</Link>
        <div style={{ marginLeft: '1em' }}> {children} </div>
      </div>
    </nav>
  );
};

export default Navigation;
