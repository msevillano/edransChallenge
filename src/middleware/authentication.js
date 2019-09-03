import {getDataFromToken} from '../utils/jwt';
import httpError from '../utils/httpError';

/**
 * Middleware for authentication.
 * @param {Object} ctx - Koa parameter for middleware.
 * @param {Function} next - Callback function to be executed after middleware ends.
 */
async function authenticator(ctx, next) {
  try {
    ctx.request.body.user = await getDataFromToken(ctx.request.header.authorization.replace('Bearer ', ''));
  } catch (err) {
    throw httpError(403, 'invalid token');
  }
  await next();
}

export default authenticator;
