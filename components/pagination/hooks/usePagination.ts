import type { Pagination } from 'morning-react-ui/components/pagination/types';

type PaginationProps = {
  pagination: Pagination;
};

const usePagination = ({ pagination }: PaginationProps) => {
  const GROWTH_LIMIT = 5;
  const DOTS_TOGGLE_SIZE = 8;

  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);

  const getBoundaries = (): { start: number; end: number } => {
    if (totalPages <= DOTS_TOGGLE_SIZE) {
      return {
        start: 2,
        end: Math.min(totalPages, DOTS_TOGGLE_SIZE - 1),
      };
    }
    if (pagination.currentPage < GROWTH_LIMIT) {
      return { start: 2, end: GROWTH_LIMIT };
    }
    if (
      pagination.currentPage >= GROWTH_LIMIT &&
      pagination.currentPage <= totalPages - GROWTH_LIMIT + 1
    ) {
      return {
        start: pagination.currentPage - 1,
        end: pagination.currentPage + 1,
      };
    }
    return {
      start: totalPages - GROWTH_LIMIT + 1,
      end: totalPages - 1,
    };
  };

  const getPrevious = (): number => {
    if (pagination.currentPage <= GROWTH_LIMIT) {
      return 1;
    }
    return pagination.currentPage - GROWTH_LIMIT;
  };

  const getNext = (): number => {
    if (pagination.currentPage >= totalPages - GROWTH_LIMIT) {
      return totalPages;
    }
    return pagination.currentPage + GROWTH_LIMIT;
  };

  return {
    ...getBoundaries(),
    getPrevious,
    getNext,
    totalPages,
    displayPreviousDots:
      totalPages > DOTS_TOGGLE_SIZE &&
      pagination.currentPage >= GROWTH_LIMIT &&
      totalPages !== GROWTH_LIMIT,
    displayNextDots:
      totalPages > DOTS_TOGGLE_SIZE &&
      totalPages > GROWTH_LIMIT &&
      pagination.currentPage <= totalPages - GROWTH_LIMIT + 1,
    displayLastItem: totalPages >= DOTS_TOGGLE_SIZE,
  };
};

export default usePagination;
