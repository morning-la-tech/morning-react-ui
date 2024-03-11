import styles from './separator.module.css';

type SeparatorProps = {
  height?: string;
  backgroundColor?: string;
};

const Separator = ({
  height = '1px',
  backgroundColor = 'var(--ash)',
}: SeparatorProps) => {
  const separatorStyle = {
    height: height,
    backgroundColor: backgroundColor,
  };

  return <div className={styles.separator} style={separatorStyle}></div>;
};

export default Separator;
