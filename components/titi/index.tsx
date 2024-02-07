import styles from './titi.module.css';

const Titi = () => {
  const toto = 'valeur de toto';
  return <div className={styles.titi}>{`test ${toto}`}</div>;
};

export default Titi;
