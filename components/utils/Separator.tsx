import { Orientation } from 'morning-react-ui/types';
import styles from './separator.module.css';

type SeparatorProps = {
  height?: string;
  width?: string;
  backgroundColor?: string;
  orientation?: Orientation;
};

const Separator = ({
  height = '1px',
  width = '100%',
  backgroundColor = 'var(--ash)',
  orientation = Orientation.Horizontal,
}: SeparatorProps) => {
  const separatorStyle = {
    height: orientation === Orientation.Horizontal ? height : '100%',
    width: orientation === Orientation.Horizontal ? '100%' : width,
    backgroundColor: backgroundColor,
  };

  return <div className={styles.separator} style={separatorStyle}></div>;
};

export default Separator;
