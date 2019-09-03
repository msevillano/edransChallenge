import jwt from 'jsonwebtoken';

/**
 * Encode an object as a JWT to be used as authentication token.
 * @param {Object} data - info to encode.
 *
 * @return {String} - encoded data.
 */
export function createSignedToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, {});
}

/**
 * Decodes a JWT and checks if its valid.
 * @param {String} token - HTTP request info.
 *
 * @return {Number} - id of the user encoded in the token.
 */
export async function getDataFromToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
