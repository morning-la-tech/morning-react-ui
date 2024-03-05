import styles from './separator.module.css';

type SeparatorProps = {
  height?: string;
  backgroundColor?: string;
};

const Separator = ({ height = '1px', backgroundColor = '#E5E9EB' }: SeparatorProps) => {
  const separatorStyle = {
    height: height,
    backgroundColor: backgroundColor,
  };

  return <div className={styles.separator} style={separatorStyle}></div>;
};

export default Separator;
