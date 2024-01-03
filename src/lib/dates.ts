/**
 *
 * @param year The year that the month belongs to.
 * @param month 0-indexed month from 0 (January) to 11 (December)
 * @returns The number of days in the month.
 */
export function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 *
 * @param month 0-indexed month from 0 (January) to 11 (December)
 * @returns The name of the corresponding month, e.g. 0 => January, 1 => February, etc.
 */
export function monthNumberToName(month: number) {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].at(month);
}

/**
 * The 0-indexed numbers corresponding to months of year. 0 (January) to 11 (December).
 */
export const monthNumbers: readonly number[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
];

export function getCurrentYearNumber() {
  return new Date().getFullYear();
}
