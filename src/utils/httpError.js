/**
 * Creates an error made to match the error middleware used on the server.
 * @param {number} errorCode - Http error Code to be returned.
 * @param {string} errorMessage - Error message to be returned.
 *
 * @return {Object} - Error object instanced.
 */
export default function httpError(errorCode, errorMessage) {
  const error = new Error(errorMessage);
  error.httpCode = errorCode;
  return error;
}
