import { HTMLProps, ReactNode, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { SkeletonCell } from './SkeletonCell';
import { useTableContext } from './Table';
import styles from './TableCell.module.css';
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
  const { registerDropdownField } = useTableContext();
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

  const isEmpty =
    children === null ||
    children === undefined ||
    (typeof children === 'string' && children.trim() === '') ||
    (Array.isArray(children) && children.length === 0);

  if (isEmpty) {
    console.log('Empty cell detected');
    return (
      <SkeletonCell
        {...props}
        showRowExpandChevron={showRowExpandChevron}
        className={className}
        style={{ height: '36px' }}
        shimmerClassName={skeletonClassName}
      />
    );
  }

  let cellValues: ReactNode | ReactNode[];
  if (!isMultiple) {
    cellValues = children;
  } else if (isOriginalArray) {
    cellValues = children as ReactNode[];
  } else {
    cellValues = Array(maxLength).fill(children);
  }

  const paddingClass = classNames({
    [styles['pl-0']]: showRowExpandChevron && isMultiple,
    [styles['pl-5']]: showRowExpandChevron && !isMultiple,
    [styles['pl-1-5']]: !showRowExpandChevron,
  });

  return (
    <td {...props} className={classNames(styles.cell, paddingClass, className)}>
      <div className={styles.innerWrapper}>
        {showRowExpandChevron && isMultiple && (
          <button
            type='button'
            className={styles.chevronButton}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Image
              className={classNames(styles.chevronIcon, {
                [styles.chevronIconExpanded]: !collapsed,
              })}
              src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/carret-right.svg`}
              alt='expand'
              width={15}
              height={15}
            />
          </button>
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
