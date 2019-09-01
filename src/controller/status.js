/**
 * Controller for /status.
 * @param {Object} ctx - Koa parameter for middleware.
 * @param {Function} next - Callback function to be executed after middleware ends.
 */
function status(ctx, next) {
  ctx.body = {health: 'ok'};
  next();
}

export default status;
