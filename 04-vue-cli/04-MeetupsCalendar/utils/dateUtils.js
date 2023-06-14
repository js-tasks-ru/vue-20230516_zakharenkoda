export const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

/**
 * Создать или клонировать дату (alias of new Date)
 * @param {Date|number|string} date
 * @return {Date}
 * */
export const makeDate = (date) => new Date(date);

/**
 * Получить день недели из даты числом от 1 (ПН) до 7 (ВС)
 * @param {Date} date
 * @return {number}
 * */
export const getWeekday = (date) => date.getUTCDay() || 7;

/**
 * Увеличить или уменьшить дату на определённое число дней
 * @param {Date} date
 * @param {number} days
 * */
export const addDays = (date, days) => makeDate(date.getTime() + days * MILLISECONDS_IN_DAY);

/**
 * Увеличить или уменьшить дату на определённое число месяцев
 * @param {Date} date
 * @param {number} months
 * @return {Date}
 */
export const addMonths = (date, months) => makeDate(makeDate(date).setUTCMonth(date.getUTCMonth() + months));

/**
 * Получить дату первого дня месяца
 * @param {Date} date
 * @return {Date}
 */
export const getFirstDateOfMonth = (date) => makeDate(makeDate(makeDate(date).setUTCDate(1)).setUTCHours(0, 0, 0, 0));

/**
 * Получить дату последнего дня месяца
 * @param {Date} date
 * @return {Date}
 */
export const getLastDateOfMonth = (date) => addDays(getFirstDateOfMonth(addMonths(date, 1)), -1);
