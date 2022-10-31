export const now = new Date();
export const currentYear = now.getFullYear();
export const currentMonth = now.getMonth();
export const currentDate = now.getDate();

export const YEAR_LIST: number[] = Array.from({length: 100}).map(
  (_, index: number) => currentYear - index,
);

export const MONTH_LIST: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
