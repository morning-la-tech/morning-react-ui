import {
  getDate,
  getMonth,
  getYear,
  isAfter,
  isEqual,
  setHours,
  setMinutes,
} from 'date-fns';

/**
 * Given a string in format XX/XX/XXXX
 * Will return an array of values [day, month, year]
 * Defaults values are today
 */
export const stringToDate = (date: string): [number, number, number] => {
  const [day, month, year] = date.split('/');
  const today = new Date();

  return [
    (day?.length ? parseInt(day.slice(-2)) : 0) || getDate(today),
    (month?.length ? parseInt(month.slice(-2)) : 0) || getMonth(today) + 1,
    (year?.length ? parseInt(year.slice(-4)) : 0) || getYear(today),
  ];
};

/**
 * Given a year value, will round it up to the 2000
 * i.e. 90 will return 2090, 190 will return 2190
 */
export const roundUpYear = (year: number): number => {
  return year < 1000 ? year + 2000 : year;
};

/**
 * Given a valid format date string
 * Will check if the values are valid as date
 * i.e. day between 1 and 31, month between 1 and 12, year positive integer
 */
export const isStringValidAsDate = (date: string): boolean => {
  if (
    date.replace(/[0-9/]/g, '').length > 0 ||
    date.split('/').length > 3 ||
    date.replace(/\//g, '').length > 8
  ) {
    return false;
  }
  const [day, month, year] = stringToDate(date);
  return day > 0 && day <= 31 && month > 0 && month <= 12 && year > 0;
};

/**
 * Given 3 dates
 * Will check if first date is between the two others
 */
export const isDateWithinEdges = (
  date: string,
  minEdge?: string,
  maxEdge?: string,
): boolean => {
  const [day, month, year] = stringToDate(date);
  const reference = new Date(roundUpYear(year), month - 1, day);
  let isRefAfterMin = true;
  let isRefBeforeMax = true;

  if (minEdge && isStringValidAsDate(minEdge)) {
    const [minDay, minMonth, minYear] = stringToDate(minEdge);
    const minTime = new Date(roundUpYear(minYear), minMonth - 1, minDay);
    isRefAfterMin = isEqual(reference, minTime) || isAfter(reference, minTime);
  }

  if (maxEdge && isStringValidAsDate(maxEdge)) {
    const [maxDay, maxMonth, maxYear] = stringToDate(maxEdge);
    const maxTime = new Date(roundUpYear(maxYear), maxMonth - 1, maxDay);
    isRefBeforeMax = isEqual(reference, maxTime) || isAfter(maxTime, reference);
  }

  return isRefBeforeMax && isRefAfterMin;
};

/**
 * Given a string in format XX:XX
 * Will return an array of values [hours, minutes]
 */
export const stringToTime = (time: string): [number, number] => {
  const [hours, minutes] = time
    .split(':')
    .map((part) => (part.length ? parseInt(part.slice(-2)) : 0));
  return [hours, minutes || 0];
};

/**
 * Given a valid format time string
 * Will check if the values are valid as date
 * i.e. hours between 0 and 23 included, minutes between 0 and 59 included
 */
export const isStringValidAsTime = (time: string): boolean => {
  if (
    time.replace(/[0-9:]/g, '').length > 0 ||
    time.split(':').length > 2 ||
    time.replace(/:/g, '').length > 4
  ) {
    return false;
  }
  const [hours, minutes] = stringToTime(time);
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
};

/**
 * Given 3 times
 * Will check if first time is between the two others
 */
export const isTimeWithinEdges = (
  time: string,
  minEdge?: string,
  maxEdge?: string,
): boolean => {
  const [hour, minute] = stringToTime(time);
  const reference = setMinutes(setHours(new Date(), hour), minute);
  let isRefAfterMin = true;
  let isRefBeforeMax = true;

  if (minEdge && isStringValidAsTime(minEdge)) {
    const [minHour, minMinute] = stringToTime(minEdge);
    const minTime = setMinutes(setHours(new Date(), minHour), minMinute);
    isRefAfterMin = isEqual(reference, minTime) || isAfter(reference, minTime);
  }

  if (maxEdge && isStringValidAsTime(maxEdge)) {
    const [maxHour, maxMinute] = stringToTime(maxEdge);
    const maxTime = setMinutes(setHours(new Date(), maxHour), maxMinute);
    isRefBeforeMax = isEqual(reference, maxTime) || isAfter(maxTime, reference);
  }

  return isRefBeforeMax && isRefAfterMin;
};
