import type { Pagination } from 'morning-react-ui/components/pagination/types';

type PaginationProps = {
  pagination: Pagination;
};

const usePagination = ({ pagination }: PaginationProps) => {
  const GROWTH_LIMIT = 5;
  const DOTS_TOGGLE_SIZE = 8;

  const amountOfPages = Math.ceil(pagination.total / pagination.pageSize);

  const getBoundaries = (): { start: number; end: number } => {
    if (amountOfPages <= DOTS_TOGGLE_SIZE) {
      return {
        start: 2,
        end: Math.min(amountOfPages, DOTS_TOGGLE_SIZE - 1),
      };
    }
    if (pagination.currentPage < GROWTH_LIMIT) {
      return { start: 2, end: GROWTH_LIMIT };
    }
    if (
      pagination.currentPage >= GROWTH_LIMIT &&
      pagination.currentPage <= amountOfPages - GROWTH_LIMIT + 1
    ) {
      return {
        start: pagination.currentPage - 1,
        end: pagination.currentPage + 1,
      };
    }
    return {
      start: amountOfPages - GROWTH_LIMIT + 1,
      end: amountOfPages - 1,
    };
  };

  const getPrevious = (): number => {
    if (pagination.currentPage <= GROWTH_LIMIT) {
      return 1;
    }
    return pagination.currentPage - GROWTH_LIMIT;
  };

  const getNext = (): number => {
    if (pagination.currentPage >= amountOfPages - GROWTH_LIMIT) {
      return amountOfPages;
    }
    return pagination.currentPage + GROWTH_LIMIT;
  };

  return {
    ...getBoundaries(),
    getPrevious,
    getNext,
    amountOfPages,
    displayPreviousDots:
      amountOfPages > DOTS_TOGGLE_SIZE &&
      pagination.currentPage >= GROWTH_LIMIT &&
      amountOfPages !== GROWTH_LIMIT,
    displayNextDots:
      amountOfPages > DOTS_TOGGLE_SIZE &&
      amountOfPages > GROWTH_LIMIT &&
      pagination.currentPage <= amountOfPages - GROWTH_LIMIT + 1,
    displayLastItem: amountOfPages >= DOTS_TOGGLE_SIZE,
  };
};

export default usePagination;
