import { HTMLProps } from 'react';
import classNames from 'classnames';
import RotatingButton from 'morning-react-ui/components/buttons/RotatingButton';
import { SortOrder } from '../enum';
import { useTableContext } from './AdvancedTable';
import styles from './tableHeader.module.css';

const TableHeader = ({
  className,
  ...props
}: HTMLProps<HTMLTableSectionElement>) => {
  return <thead {...props} className={classNames(styles.thead, className)} />;
};

/**
 * Props for the TableHead component.
 *
 * @property {string} [field] - Identifier for the column associated with this header.
 * @property {SortOrder | null} [order] - Sort state:
 *   - `undefined`: sorting disabled,
 *   - `null`: sortable but currently unsorted,
 *   - `SortOrder.Asc`: sorted ascending,
 *   - `SortOrder.Desc`: sorted descending.
 * @property {() => void} [sortCallback] - Callback invoked when the header is clicked to change sort order.
 */
type TableHeadProps = HTMLProps<HTMLTableCellElement> & {
  sortCallback?: () => void;
  order?: SortOrder | null;
  field?: string;
};

const TableHead = ({
  field,
  className,
  children,
  order,
  sortCallback,
  ...props
}: TableHeadProps) => {
  const { dropdownFields, isLoading } = useTableContext();
  const hasDropdown = dropdownFields?.[field ?? ''] ?? false;

  const paddingClass = hasDropdown ? styles['pl-5-pr-1-5'] : styles['px-1-5'];

  return (
    <th
      {...props}
      className={classNames(
        styles.th,
        paddingClass,
        !isLoading && order !== undefined && styles.clickable,
        className,
      )}
      onClick={() =>
        !isLoading && order !== undefined && sortCallback && sortCallback()
      }
    >
      <div className={styles.labelWrapper}>
        {children}
        {order !== undefined && sortCallback && (
          <RotatingButton
            collapsed={order !== SortOrder.Desc}
            rotationDeg={180}
            src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}/icons/pilote-chevron-down.svg`}
            alt={`Sort by ${field}`}
            style={{
              opacity: order !== null ? 1 : 0,
              transition: order !== null ? 'opacity 200ms ease-in-out' : 'none',
            }}
          />
        )}
      </div>
    </th>
  );
};

export { TableHeader, TableHead };
