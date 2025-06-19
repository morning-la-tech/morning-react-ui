import { Dispatch, useMemo } from 'react';
import classNames from 'classnames';
import { PaginationItem } from 'morning-react-ui/components/pagination';
import usePagination from 'morning-react-ui/components/pagination/hooks/usePagination';
import type { Pagination } from 'morning-react-ui/components/pagination/types';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from './pagination.module.css';

type Props = {
  pagination: Pagination;
  setCurrentPage: Dispatch<number>;
  size?: Size;
};

const PaginationComponent = ({
  pagination,
  setCurrentPage,
  size = Size.m,
}: Props) => {
  const {
    totalPages,
    start,
    end,
    getNext,
    getPrevious,
    displayNextDots,
    displayPreviousDots,
    displayLastItem,
  } = usePagination({ pagination });

  const pages = useMemo(() => {
    return Array.from({ length: end - start + 1 }, (_, i) => {
      const page = start + i;
      return (
        <PaginationItem
          key={page}
          page={page}
          size={size}
          setCurrentPage={setCurrentPage}
          isSelected={page === pagination.currentPage}
        />
      );
    });
  }, [start, end, pagination.currentPage, setCurrentPage, size]);

  return (
    <div className={classNames(styles.pageSelector)}>
      <PaginationItem
        page={1}
        size={size}
        setCurrentPage={setCurrentPage}
        isSelected={1 === pagination.currentPage}
      />
      {displayPreviousDots && (
        <PaginationItem
          key={`previous-dots-${start}`}
          page={getPrevious()}
          size={size}
          setCurrentPage={setCurrentPage}
          isPrevious
          isSelected={false}
        />
      )}
      {pages}
      {displayNextDots && (
        <PaginationItem
          key={`next-dots-${end}`}
          page={getNext()}
          size={size}
          setCurrentPage={setCurrentPage}
          isNext
          isSelected={false}
        />
      )}
      {displayLastItem && (
        <PaginationItem
          key={`last-page`}
          page={totalPages}
          size={size}
          setCurrentPage={setCurrentPage}
          isSelected={totalPages === pagination.currentPage}
        />
      )}
    </div>
  );
};

export default PaginationComponent;
