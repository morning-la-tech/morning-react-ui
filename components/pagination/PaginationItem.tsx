import React, { Dispatch, useState } from 'react';
import classNames from 'classnames';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from './pagination.module.css';

type Props = {
  page: number;
  setCurrentPage: Dispatch<number>;
  isSelected?: boolean;
  isDisabled?: boolean;
  isPrevious?: boolean;
  isNext?: boolean;
  size?: Size;
};

const PaginationItem = ({
  page,
  setCurrentPage,
  isSelected,
  isDisabled,
  isPrevious,
  isNext,
  size = Size.m,
}: Props) => {
  const [isHover, setIsHover] = useState<boolean>();
  const outSymbol = <>&#8943;</>;
  const inSymbol = isPrevious ? <>&laquo;</> : <>&raquo;</>;
  return (
    <span
      key={page}
      onClick={() => setCurrentPage(page)}
      className={classNames(`font-size-${size}`, styles[size], {
        [styles.pageNumber]: true,
        [styles.selected]: isSelected || false,
        [styles.disabled]: isDisabled || false,
      })}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isPrevious || isNext ? (isHover ? inSymbol : outSymbol) : page}
    </span>
  );
};

export default PaginationItem;
