import logger from '../core/logger';
/**
 * Middleware for error parsing.
 * @param {Object} ctx - Koa parameter for middleware.
 * @param {Function} next - Callback function to be executed after middleware ends.
 */
async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.httpCode) {
      ctx.status = err.httpCode;
      ctx.body = err.message;
    } else {
      ctx.status = 500;
      ctx.body ='internal server error';
    }
    if (ctx.status < 500) logger.warn(err.message);
    else logger.error(err.message);
  }
}

export default errorHandler;
