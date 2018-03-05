/**
 * Convert a CamelCase to kebap-case.
 *
 * @param {string} string
 * @param {string} separator
 * @returns {string}
 */
module.exports.decamelize = (string, separator = '-') => {
  return string.split(/(?=[A-Z])/).join(separator).toLowerCase()
}
