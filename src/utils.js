/**
 * 
 * @param {any} date - The date to format
 * @returns {string} The ISO format of the date (yyyy-MM-dd), or date.toString() if it is not a Date object
 */
function formatDate(date) {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }

  return date.toString();
}

/**
 * 
 * Custom date ordering function for sort:
 *  > : -1,
 * == :  0,
 *  < : +1,
 * 
 * @param {int | Date} a - the first date/year
 * @param {int | Date} b - the second date/year
 * @returns {number} Descending ordering for a and b
 */
function orderNumbersDesc(a, b) {
  //  > -1
  // ==  0
  //  < +1

  if (!a && !b) return  0;
  if (!a &&  b) return -1; 
  if ( a && !b) return +1; 
  return b - a;
}

/**
 * Returns wether the passed string represents a ISO Date of a single number (year).
 * @param {int | Date} str - 
 * @returns {boolean}
 */
function isYear(str) {
  return parseInt(str)?.toString().length === str?.length;
}

export { formatDate, orderNumbersDesc, isYear };