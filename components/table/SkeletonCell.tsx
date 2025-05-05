import { HTMLProps } from 'react';
import classNames from 'classnames';
import styles from './skeletonCell.module.css';

interface SkeletonCellProps extends HTMLProps<HTMLTableCellElement> {
  showRowExpandChevron?: boolean;
  field?: string;
  shimmerClassName?: string;
}

const SkeletonCell = ({
  className,
  showRowExpandChevron,
  shimmerClassName,
  ...props
}: SkeletonCellProps) => {
  return (
    <td
      {...props}
      className={classNames(
        styles.cell,
        showRowExpandChevron && styles.cellWithChevron,
        className,
      )}
    >
      <div className={classNames(styles.shimmerWrapper, shimmerClassName)}>
        <div className={styles.shimmer} />
      </div>
    </td>
  );
};

export { SkeletonCell };
