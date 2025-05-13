import { ReactNode, useState } from 'react';
import RotatingButton from 'morning-react-ui/components/buttons/RotatingButton';
import { SkeletonCell } from '../advanced';
import styles from './table.module.css';

export type TableColumn = {
  key: string;
  header: string;
};

export type TableRowData = Record<string, string | ReactNode>;

type Props = {
  data: TableRowData[];
  columns: TableColumn[];
  onSortChange?: (field: string, order: 'asc' | 'desc') => void;
  isLoading?: boolean;
  skeletonRows?: number;
};

const SimpleTable = ({
  data,
  columns,
  onSortChange,
  isLoading = false,
  skeletonRows = 5,
}: Props) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newOrder);
      onSortChange?.(key, newOrder);
    } else {
      setSortKey(key);
      setSortOrder('asc');
      onSortChange?.(key, 'asc');
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
          {columns.map(({ key, header }) => (
            <th className={styles.th} key={key}>
              <div className={styles.thContent} onClick={() => handleSort(key)}>
                {header}
                <RotatingButton
                  collapsed={sortOrder === 'asc'}
                  rotationDeg={180}
                  src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}/icons/pilote-chevron-down.svg`}
                  alt={`Sort by ${header}`}
                  style={{
                    opacity: sortKey === key ? 1 : 0,
                    transition: 'opacity 200ms ease-in-out',
                  }}
                />
              </div>
            </th>
          ))}
          <th className={styles.th} style={{ width: '16px' }} />
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row ? `row-${i}` : `skeleton-${i}`} className={styles.tr}>
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
        ))}
      </tbody>
    </table>
  );
};

export { SimpleTable };
