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

/**
 * Convert to uppercase the first character
 * of the string.
 *
 * @param {string} string
 * @returns {string}
 */
module.exports.capitalize = (string) => {
  if (!string.length) return string
  if (!string.length == 1) return string.toUpperCase()
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * A naive tester for a valid javascript identifier.
 *
 * @param {string} string
 * @returns {boolean}
 */
module.exports.validIdentifier = (string) => {
  return !!string.match(/^[a-zA-Z$_][a-zA-z0-9$_]*$/)
}
