import React, { RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {
  addMonths,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  addDays,
  endOfMonth,
  addWeeks,
  getDayOfYear,
} from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { format } from '@/node_modules/date-fns/format';
import {
  isDateWithinEdges,
  roundUpYear,
  stringToDate,
} from '@/utils/datetimeUtils';
import { Size, sizeToNumber } from '@/utils/Enum';
import { capitalizeStr } from '@/utils/stringUtils';
import styles from './calendarComponent.module.css';

type CalendarComponentProps = {
  inputValue: string | null;
  from?: string;
  to?: string;
  display: boolean;
  parentRef: RefObject<HTMLInputElement>;
  setDisplay: (value: boolean) => void;
  onSelect: (date: Date) => void;
};

const CalendarComponent = ({
  inputValue,
  from,
  to,
  parentRef,
  display,
  setDisplay,
  onSelect,
}: CalendarComponentProps) => {
  const myDivRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <div
        ref={myDivRef}
        className={classNames(styles.calendarContainer, {
          [styles.hidden]: !display,
        })}
      >
        <div className={classNames(styles.calendarHeader)}>
          <div className={classNames(styles.calendarHeaderDate)}>
            {capitalizeStr(format(displayedDate, 'MMMM yyyy', { locale: fr }))}
          </div>
          <div className={classNames(styles.calendarHeaderActions)}>
            <Image
              src='https://cdn.morning.fr/icons/chevron-left.svg'
              alt='Dropdown'
              width={sizeToNumber(Size.l)}
              height={sizeToNumber(Size.l)}
              onClick={() => {
                incrDisplayedDate(-1);
              }}
            />
            <Image
              src='https://cdn.morning.fr/icons/chevron-right.svg'
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
    </>
  );
};

CalendarComponent.displayName = 'CalendarComponent';

export default CalendarComponent;
