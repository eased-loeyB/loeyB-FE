const currentYear = new Date().getFullYear();

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
