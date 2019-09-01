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
    ctx.status = err.status || 500;
    ctx.body = err.message || 'internal server error';
    logger.error(err);
  }
}

export default errorHandler;
