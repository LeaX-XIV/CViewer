/**
 * Returns the ISO format of the date (yyyy-MM-dd), or date.toString() if it is not a Date object.
 * @param {any} date - The date to format
 * @returns {string} A string representation of the date
 */
function formatDate(date) {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }

  return date.toString();
}

/**
 * Custom date ordering function for sort:
 *  > : -1,
 * == :  0,
 *  < : +1,
 * 
 * @param {int | Date} a - The first date/year
 * @param {int | Date} b - The second date/year
 * @returns {number} Descending ordering for a and b
 */
function orderDatesDesc(a, b) {
  //  > -1
  // ==  0
  //  < +1

  if (!a && !b) return  0;
  if (!a &&  b) return -1; 
  if ( a && !b) return +1; 
  return new Date(b) - new Date(a);
}

/**
 * Returns wether the passed string represents a ISO Date of a single number (year).
 * @param {string} str - 
 * @returns {boolean}
 */
function isYear(str) {
  return parseInt(str)?.toString().length === str?.length;
}

/**
 * Returns the year of the date, or the integer parsing if the parameter is not a parsable date.
 * @param {string} date - A parsable date, or a year.
 * @returns {int} The year of the date
 */
function extractYear(date) {
  if (isYear(date)) {
    return parseInt(date);
  }

  const d = new Date(date);
  return d.getFullYear();
}

/**
 * Returns a new string, with the first character capitalized.
 * @param {string} str - String to be capitalized.
 * @returns {string} str with the first character capitalized
 */
function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}

export { formatDate, orderDatesDesc, isYear, extractYear, capitalize };