import { HTMLProps, ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import RotatingButton from 'morning-react-ui/components/buttons/RotatingButton';
import { useTableContext } from './AdvancedTable';
import { SkeletonCell } from './SkeletonCell';
import styles from './tableCell.module.css';
import { useTableRowContext } from './TableRow';

type TableCellProps = HTMLProps<HTMLTableCellElement> & {
  showRowExpandChevron?: boolean;
  field?: string;
  skeletonClassName?: string;
};

const TableCell = ({
  className,
  showRowExpandChevron,
  children,
  field,
  skeletonClassName,
  ...props
}: TableCellProps) => {
  const { registerDropdownField, isLoading } = useTableContext();
  const { collapsed, setCollapsed, maxLength } = useTableRowContext();
  const isOriginalArray = Array.isArray(children);
  const isMultiple = maxLength > 1;

  useEffect(() => {
    if (field) {
      registerDropdownField(
        field,
        (showRowExpandChevron && isMultiple) || false,
      );
    }
  }, [field, showRowExpandChevron, isMultiple]);

  // If the cell is empty -> show a skeleton
  if (isLoading) {
    return (
      <SkeletonCell
        {...props}
        showRowExpandChevron={showRowExpandChevron}
        className={className}
        shimmerClassName={skeletonClassName}
      />
    );
  }

  // If the cell is a copied one in the dropdown, we need to show the original value
  const cellValues: ReactNode | ReactNode[] = (() => {
    if (!isMultiple || Array.isArray(children)) {
      return children;
    }
    return Array(maxLength).fill(children);
  })();

  const paddingClass = (() => {
    if (showRowExpandChevron && isMultiple) {
      return styles['pl-0']; // no padding -> chevron in the column and in the cell (icon is 20px wide)
    }
    if (showRowExpandChevron) {
      return styles['pl-5']; // 20px padding -> chevron in the column but not in the cell
    }
    return styles['pl-1-5']; // 6px padding -> no chevron in the column
  })();

  return (
    <td {...props} className={classNames(styles.cell, paddingClass, className)}>
      <div className={styles.innerWrapper}>
        {showRowExpandChevron && isMultiple && (
          <RotatingButton
            collapsed={collapsed}
            toggle={() => setCollapsed(!collapsed)}
            rotationDeg={90}
            src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/caret-right.svg`}
            alt='caret'
          />
        )}
        {isMultiple ? (
          <div
            className={styles.multipleWrapper}
            style={{
              maxHeight: collapsed
                ? '20px'
                : `${(cellValues as ReactNode[]).length * 28}px`,
            }}
          >
            {(cellValues as ReactNode[]).map((child, index) => (
              <div
                key={index}
                className={classNames(styles.multipleItem, {
                  [styles.multipleItemFirst]: isOriginalArray || index === 0,
                })}
              >
                {child}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.singleWrapper}>{cellValues}</div>
        )}
      </div>
    </td>
  );
};

export { TableCell };
