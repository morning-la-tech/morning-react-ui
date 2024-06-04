import { Dispatch, JSX } from 'react';
import classNames from 'classnames';
import { PaginationItem } from 'morning-react-ui/components/pagination';
import usePagination from 'morning-react-ui/components/pagination/hooks/usePagination';
import type { Pagination } from 'morning-react-ui/components/pagination/types';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from './pagination.module.css';
import Element = JSX.Element;

type Props = {
  pagination: Pagination;
  setCurrentPage: Dispatch<number>;
  hasBorder?: boolean;
  size?: Size;
};
const PaginationComponent = ({
  pagination,
  setCurrentPage,
  hasBorder = false,
  size = Size.m,
}: Props) => {
  const {
    amountOfPages,
    start,
    end,
    getNext,
    getPrevious,
    displayNextDots,
    displayPreviousDots,
    displayLastItem,
  } = usePagination({
    pagination,
  });
  const pages: Element[] = [];

  for (let page = start; page <= end; page++) {
    pages.push(
      <PaginationItem
        key={page}
        page={page}
        size={size}
        setCurrentPage={setCurrentPage}
        isSelected={page === pagination.currentPage}
      />,
    );
  }

  return (
    <div
      className={classNames(styles.pageSelector, {
        [styles.hasBorder]: hasBorder,
      })}
    >
      <PaginationItem
        page={1}
        size={size}
        setCurrentPage={setCurrentPage}
        isSelected={1 === pagination.currentPage}
      />
      {displayPreviousDots && (
        <PaginationItem
          key={pagination.currentPage - 2}
          page={getPrevious()}
          size={size}
          setCurrentPage={setCurrentPage}
          isPrevious={true}
          isSelected={false}
        />
      )}
      {pages.map((pageSelector) => pageSelector)}
      {displayNextDots && (
        <PaginationItem
          key={pagination.currentPage + 2}
          page={getNext()}
          size={size}
          setCurrentPage={setCurrentPage}
          isNext={true}
          isSelected={false}
        />
      )}
      {displayLastItem && (
        <PaginationItem
          page={amountOfPages}
          size={size}
          setCurrentPage={setCurrentPage}
          isSelected={amountOfPages === pagination.currentPage}
        />
      )}
    </div>
  );
};

export default PaginationComponent;
