import React, { RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  getDayOfYear,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { createPortal } from 'react-dom';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale/fr';
import {
  isDateWithinEdges,
  roundUpYear,
  stringToDate,
} from 'morning-react-ui/utils/datetimeUtils';
import { Size, sizeToNumber } from 'morning-react-ui/utils/Enum';
import { capitalizeStr } from 'morning-react-ui/utils/stringUtils';
import styles from './calendarComponent.module.css';

type FloatingCalendarComponentProps = {
  inputValue: string | null;
  from?: string;
  to?: string;
  display: boolean;
  parentRef: RefObject<HTMLInputElement | null>;
  setDisplay: (value: boolean) => void;
  onSelect: (date: Date) => void;
};

const FloatingCalendarComponent = ({
  inputValue,
  from,
  to,
  parentRef,
  display,
  setDisplay,
  onSelect,
}: FloatingCalendarComponentProps) => {
  const myDivRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [displayedDate, setDisplayedDate] = useState(() => {
    if (inputValue) {
      const [day, month, year] = stringToDate(inputValue);
      return new Date(year, month - 1, day);
    }
    return new Date();
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (inputValue) {
      const [day, month, year] = stringToDate(inputValue);
      return new Date(year, month - 1, day);
    }
    return null;
  });

  // Compute the position of the calendar
  const updatePosition = () => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      // Approximate dimensions of the calendar
      const calendarHeight = 345; // Height of the calendar
      const calendarWidth = 325; // Width of the calendar
      const margin = 10;

      // Compute the vertical position
      let top = rect.bottom + scrollTop + margin;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // If there is not enough space below and more space above, display above
      if (spaceBelow < calendarHeight && spaceAbove > spaceBelow) {
        top = rect.top + scrollTop - calendarHeight - margin;
      }

      // Compute the horizontal position
      let left = rect.left + scrollLeft;
      const spaceRight = window.innerWidth - rect.left;

      // If there is not enough space to the right, align to the right
      if (spaceRight < calendarWidth) {
        left = Math.max(0, rect.right + scrollLeft - calendarWidth);
      }

      setPosition({
        top,
        left: left - 11,
      });
    }
  };

  // Find all scrollable parent containers
  const findScrollableParents = (element: HTMLElement): HTMLElement[] => {
    const scrollableParents: HTMLElement[] = [];
    let parent = element.parentElement;

    while (parent && parent !== document.body) {
      const style = window.getComputedStyle(parent);
      const overflow = style.overflow + style.overflowX + style.overflowY;

      if (overflow.includes('scroll') || overflow.includes('auto')) {
        scrollableParents.push(parent);
      }
      parent = parent.parentElement;
    }

    return scrollableParents;
  };

  // Update the position when the calendar is displayed
  useEffect(() => {
    if (display && parentRef.current) {
      updatePosition();

      // Throttle function to limit the frequency of position updates
      let throttleTimer: NodeJS.Timeout | null = null;
      const throttledUpdatePosition = () => {
        if (throttleTimer) return;
        throttleTimer = setTimeout(() => {
          updatePosition();
          throttleTimer = null;
        }, 16); // ~60fps
      };

      // Update the position when the scroll or resize is triggered
      const handleScroll = () => throttledUpdatePosition();
      const handleResize = () => updatePosition();

      // Listen to window scroll and resize
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      // Find and listen to all scrollable parent containers
      const scrollableParents = findScrollableParents(parentRef.current);
      scrollableParents.forEach((parent) => {
        parent.addEventListener('scroll', handleScroll);
      });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);

        // Remove listeners from scrollable parents
        scrollableParents.forEach((parent) => {
          parent.removeEventListener('scroll', handleScroll);
        });

        // Clear throttle timer
        if (throttleTimer) {
          clearTimeout(throttleTimer);
        }
      };
    }
  }, [display]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (display) {
        if (
          myDivRef.current &&
          !myDivRef.current.contains(event.target as Node) &&
          parentRef &&
          parentRef.current &&
          !parentRef.current.contains(event.target as Node)
        ) {
          setDisplay(false);
          setDisplayedDate(
            inputValue == null || inputValue == '' ? new Date() : displayedDate,
          );
        }
      }
    }

    function handleTabEvent(event: KeyboardEvent) {
      if (event.key === 'Tab') {
        setDisplay(false);
        setDisplayedDate(
          inputValue == null || inputValue == '' ? new Date() : displayedDate,
        );
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleTabEvent);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleTabEvent);
    };
  }, [display]);

  useEffect(() => {
    if (inputValue == null || inputValue == '') {
      setSelectedDate(null);
      setDisplayedDate(new Date());
      return;
    }

    const [day, month, year] = stringToDate(inputValue);
    if (isDateWithinEdges(`${day}/${month}/${year}`, from, to)) {
      setSelectedDate(new Date(roundUpYear(year), month - 1, day));
      setDisplayedDate(new Date(roundUpYear(year), month - 1, day));
    }
  }, [inputValue]);

  const incrDisplayedDate = (incr: number) => {
    setDisplayedDate(addMonths(displayedDate, incr));
  };

  const generateCalendarLabels = (date: Date) => {
    const weekDays = [];
    let firstDay = startOfWeek(date, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      weekDays.push(firstDay);
      firstDay = addDays(firstDay, 1);
    }

    return weekDays.map((day, index) => (
      <div key={`label-${index}`} className={classNames(styles.dayLabels)}>
        {capitalizeStr(format(day, 'ccc', { locale: fr }))}
      </div>
    ));
  };

  const generateCalendarLine = (weekStart: Date) => {
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      weekDays.push(weekStart);
      weekStart = addDays(weekStart, 1);
    }

    return weekDays.map((day, index) => (
      <div
        key={`calendar-${getDayOfYear(day)}-${index}`}
        onClick={() => {
          if (isDateWithinEdges(format(day, 'dd/MM/yyyy'), from, to)) {
            onSelect(day);
            setDisplay(false);
            setDisplayedDate(
              inputValue == null || inputValue == ''
                ? new Date()
                : displayedDate,
            );
          }
        }}
        className={classNames(styles.days, {
          [styles.selected]: selectedDate
            ? isSameDay(selectedDate, day)
            : false,
          [styles.outOfMonth]: !isSameMonth(day, displayedDate),
          [styles.today]: isToday(day),
          [styles.outOfBoundary]: !isDateWithinEdges(
            format(day, 'dd/MM/yyyy'),
            from,
            to,
          ),
        })}
      >
        {format(day, 'd')}
      </div>
    ));
  };

  const generateCalendarContent = (monthStart: Date) => {
    let start = startOfWeek(monthStart, { weekStartsOn: 1 });
    const monthEnd = endOfMonth(monthStart);
    const content = [];

    do {
      content.push(generateCalendarLine(start));
      start = addWeeks(start, 1);
    } while (isBefore(start, monthEnd));

    return content.map((line) => {
      return line;
    });
  };

  const generateCalendar = (date: Date) => {
    const start = startOfMonth(date);
    const startWeek = startOfWeek(start, { weekStartsOn: 1 });
    return (
      <>
        {generateCalendarLabels(startWeek)}
        {generateCalendarContent(start)}
      </>
    );
  };

  // Contenu du calendrier
  const calendarContent = (
    <div
      ref={myDivRef}
      className={classNames(styles.calendarContainer, styles.portal, {
        [styles.hidden]: !display,
      })}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className={classNames(styles.calendarHeader)}>
        <div className={classNames(styles.calendarHeaderDate)}>
          {capitalizeStr(format(displayedDate, 'MMMM yyyy', { locale: fr }))}
        </div>
        <div className={classNames(styles.calendarHeaderActions)}>
          <Image
            src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/chevron-left.svg`}
            alt='Dropdown'
            width={sizeToNumber(Size.l)}
            height={sizeToNumber(Size.l)}
            onClick={() => {
              incrDisplayedDate(-1);
            }}
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/chevron-right.svg`}
            alt='Dropdown'
            width={sizeToNumber(Size.l)}
            height={sizeToNumber(Size.l)}
            onClick={() => {
              incrDisplayedDate(1);
            }}
          />
        </div>
      </div>
      <div className={classNames(styles.calendarContent)}>
        {generateCalendar(displayedDate)}
      </div>
    </div>
  );

  // Utiliser createPortal pour rendre le calendrier dans le body
  return display && typeof document !== 'undefined'
    ? createPortal(calendarContent, document.body)
    : null;
};

FloatingCalendarComponent.displayName = 'FloatingCalendarComponent';

export default FloatingCalendarComponent;
