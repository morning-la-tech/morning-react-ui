import styles from '../modal.module.scss';

type ModalHeaderProps = {
  hide: () => void;
  title?: string;
  hasCloseButton?: boolean;
};

const ModalHeader = ({ hide, title, hasCloseButton }: ModalHeaderProps) => {
  return (
    <div className={styles.header}>
      <span className={styles.title}>{title}</span>
      {hasCloseButton && (
        <button className={styles.closeButton} onClick={hide}></button>
      )}
    </div>
  );
};

export default ModalHeader;
