import { ReactNode, useState } from 'react';
import classNames from 'classnames';
import RotatingButton from 'morning-react-ui/components/buttons/RotatingButton';
import { SkeletonCell } from '../advanced';
import { SortOrder } from '../enum';
import styles from './table.module.css';

export type TableColumn = {
  key: string;
  header: string;
  sortable?: boolean;
};

export type TableRowData = Record<string, string | ReactNode>;

type Props = {
  data: TableRowData[];
  columns: TableColumn[];
  onSortChange?: (field: string, order: SortOrder) => void;
  isLoading?: boolean;
  skeletonRows?: number;
  onRowClick?: (row: TableRowData | null) => void;
  emptyMessage?: string;
};

const SimpleTable = ({
  data,
  columns,
  onSortChange,
  isLoading = false,
  skeletonRows = 5,
  onRowClick,
  emptyMessage,
}: Props) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);

  const isColumnSortable = (column: TableColumn): boolean => {
    if (column.sortable !== undefined) {
      return column.sortable;
    }
    return !!onSortChange;
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      const newOrder =
        sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;
      setSortOrder(newOrder);
      onSortChange?.(key, newOrder);
    } else {
      setSortKey(key);
      setSortOrder(SortOrder.Asc);
      onSortChange?.(key, SortOrder.Asc);
    }
  };

  const rows: (TableRowData | null)[] = isLoading
    ? Array.from({ length: skeletonRows }, () => null)
    : data;

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th} style={{ width: '16px' }} />
          {columns.map((column) => {
            const sortable = isColumnSortable(column);
            return (
              <th
                className={classNames(styles.th, {
                  [styles.sortable]: sortable,
                })}
                key={column.key}
              >
                <div
                  className={classNames(styles.thContent, {
                    [styles.sortable]: sortable,
                  })}
                  onClick={sortable ? () => handleSort(column.key) : undefined}
                >
                  {column.header}
                  {sortable && (
                    <RotatingButton
                      collapsed={sortOrder === SortOrder.Asc}
                      rotationDeg={-180}
                      src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}/icons/pilote-chevron-down.svg`}
                      alt={`Sort by ${column.header}`}
                      style={{
                        opacity: sortKey === column.key ? 1 : 0,
                        transition:
                          sortKey === column.key
                            ? 'opacity 400ms ease-in-out'
                            : 'none',
                      }}
                      imageStyle={
                        sortKey !== column.key ? { transition: 'none' } : {}
                      }
                    />
                  )}
                </div>
              </th>
            );
          })}
          <th className={styles.th} style={{ width: '16px' }} />
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, i) => (
            <tr
              key={row ? `row-${i}` : `skeleton-${i}`}
              className={classNames(styles.tr, {
                [styles.clickable]: !!onRowClick,
              })}
              onClick={() => onRowClick?.(row)}
            >
              <td />
              {columns.map(({ key }) =>
                row === null ? (
                  <SkeletonCell
                    key={key}
                    className={styles.td}
                    shimmerClassName={styles.skeletonSize}
                  />
                ) : (
                  <td key={key} className={styles.td}>
                    {row[key]}
                  </td>
                ),
              )}
              <td />
            </tr>
          ))
        ) : (
          <tr className={styles.emptyRowTr}>
            <td />
            <td
              className={classNames(styles.td, styles.emptyMessage)}
              colSpan={columns.length + 2}
            >
              {emptyMessage || 'No data'}
            </td>
            <td />
          </tr>
        )}
      </tbody>
    </table>
  );
};

export { SimpleTable };
